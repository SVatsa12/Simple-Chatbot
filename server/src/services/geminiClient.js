import Groq from 'groq-sdk'
import { config } from '../config/env.js'

const groq = new Groq({ apiKey: config.groqApiKey })

export async function processMessage(message, tasks, retryCount = 0) {
  const maxRetries = 3
  const retryDelay = 2000 // 2 seconds
  
  try {
    const prompt = buildPrompt(message, tasks)
    
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI task assistant that helps users manage their tasks through natural conversation.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 0.95,
    })

    const text = completion.choices[0]?.message?.content || ''

    // Parse the AI response to extract action and data
    return parseAIResponse(text, message, tasks)
  } catch (error) {
    console.error('Error calling Groq API:', error)
    
    // Check if error is retryable (503, 429, network errors)
    const isRetryable = error.message?.includes('503') || 
                        error.message?.includes('overloaded') ||
                        error.message?.includes('429') ||
                        error.message?.includes('rate')
    
    if (isRetryable && retryCount < maxRetries) {
      console.log(`Retrying... (${retryCount + 1}/${maxRetries}) in ${retryDelay}ms`)
      await new Promise(resolve => setTimeout(resolve, retryDelay * (retryCount + 1)))
      return processMessage(message, tasks, retryCount + 1)
    }
    
    throw new Error('Failed to process message with AI. Please try again in a moment.')
  }
}

function buildPrompt(message, tasks) {
  const today = new Date().toISOString().split('T')[0]
  const tomorrow = getTomorrowDate()
  
  const tasksSummary = tasks.length > 0 
    ? tasks.map(t => `- ${t.title} ${t.completed ? '(completed)' : ''} ${t.dueDate ? `due: ${t.dueDate}` : ''}`).join('\n')
    : 'No tasks yet'

  return `You are a helpful AI task assistant. Your role is to help users manage their tasks through natural conversation.

TODAY'S DATE: ${today}
TOMORROW'S DATE: ${tomorrow}

Current tasks (${tasks.length}):
${tasksSummary}

User message: "${message}"

Your task is to:
1. Understand the user's intent (adding task, viewing tasks, updating task, etc.)
2. Respond naturally and helpfully
3. Extract structured data when needed

IMPORTANT: Format your response EXACTLY as shown below:

ACTION: <one of: add_task, show_tasks, update_task, delete_task, mark_complete, general_chat>
MESSAGE: <Your friendly, natural response to the user>
DATA: <JSON object with task details, or empty object {}>

Rules for each action:
- add_task: Extract title (required), description, priority (low/medium/high), dueDate in YYYY-MM-DD format
  * If "today" → use ${today}
  * If "tomorrow" → use ${tomorrow}
  * If specific date mentioned (e.g., "Dec 1", "December 1st", "1 Dec") → convert to YYYY-MM-DD format
  * If no date mentioned → leave dueDate empty
- show_tasks: Just provide a summary
- mark_complete: When user says they completed/finished/done a task, return the task title in DATA
- update_task: Identify task and what to update
- delete_task: Identify which task to delete
- general_chat: For greetings, questions, or general conversation

Examples:

User: "Add task: Buy groceries tomorrow"
ACTION: add_task
MESSAGE: Got it! I've added "Buy groceries" to your tasks for tomorrow. 🛒
DATA: {"title": "Buy groceries", "priority": "medium", "dueDate": "${tomorrow}"}

User: "Add task: Make a GenAI ppt and the due date is 1 Dec"
ACTION: add_task
MESSAGE: Got it! I've added "Make a GenAI ppt" to your tasks, due on December 1st.
DATA: {"title": "Make a GenAI ppt", "priority": "medium", "dueDate": "2025-12-01"}

User: "I completed the groceries task" or "I bought the groceries"
ACTION: mark_complete
MESSAGE: Great job on buying the groceries! 🎉 That task is now complete. You currently have no other tasks on your list. Is there anything else I can help you with today?
DATA: {"title": "Buy groceries"}

User: "Show me my tasks"
ACTION: show_tasks
MESSAGE: You have ${tasks.length} task${tasks.length !== 1 ? 's' : ''}. ${tasks.length > 0 ? 'Here they are!' : 'Start by adding your first task!'}
DATA: {}

User: "Hello!"
ACTION: general_chat
MESSAGE: Hello! 👋 I'm your AI task assistant. I can help you add tasks, organize your schedule, and stay productive. What would you like to do today?
DATA: {}

Now respond to: "${message}"`
}

function getTomorrowDate() {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
}

function parseAIResponse(text, originalMessage, tasks) {
  try {
    // Extract ACTION
    const actionMatch = text.match(/ACTION:\s*(\w+)/i)
    const action = actionMatch ? actionMatch[1].toLowerCase() : 'general_chat'

    // Extract MESSAGE
    const messageMatch = text.match(/MESSAGE:\s*(.+?)(?=DATA:|$)/is)
    let message = messageMatch ? messageMatch[1].trim() : text

    // Extract DATA
    const dataMatch = text.match(/DATA:\s*(\{[\s\S]*?\})/i)
    let task = null
    
    if (dataMatch) {
      try {
        const jsonStr = dataMatch[1].trim()
        task = JSON.parse(jsonStr)
        
        // Validate and enhance task data
        if (task && Object.keys(task).length > 0) {
          if (task.title) {
            task.title = task.title.trim()
          }
          if (task.priority && !['low', 'medium', 'high'].includes(task.priority.toLowerCase())) {
            task.priority = 'medium'
          }
          if (task.dueDate) {
            // Validate date format
            const dateTest = new Date(task.dueDate)
            if (isNaN(dateTest.getTime())) {
              delete task.dueDate
            }
          }
        }
      } catch (e) {
        console.error('Failed to parse task data:', e)
        task = null
      }
    }

    return { 
      action, 
      message: message || 'I understood your request!', 
      task 
    }
  } catch (error) {
    console.error('Error parsing AI response:', error)
    return {
      action: 'general_chat',
      message: 'I can help you manage your tasks. Try asking me to add a task!',
      task: null
    }
  }
}
