import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import ChatWindow from '../components/chat/ChatWindow'
import ChatInput from '../components/chat/ChatInput'
import TaskList from '../components/tasks/TaskList'
import TaskStats from '../components/tasks/TaskStats'
import { useTasks } from '../hooks/useTasks'
import { sendMessageToAI } from '../services/aiClient'
import '../styles/assistant.css'

function AssistantPage() {
  const { tasks, addTask, updateTask, deleteTask } = useTasks()
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showTasks, setShowTasks] = useState(true)

  const sendMessage = async (content) => {
    const userMessage = {
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await sendMessageToAI(content, tasks)
      
      const assistantMessage = {
        role: 'assistant',
        content: response.message,
        timestamp: new Date().toISOString()
      }

      setMessages(prev => [...prev, assistantMessage])

      // Handle task operations from AI response
      if (response.action === 'add_task' && response.task) {
        addTask(response.task)
      } else if (response.action === 'mark_complete' && response.task) {
        // Find the task by title and mark it as completed
        const taskToComplete = tasks.find(t => 
          t.title.toLowerCase().includes(response.task.title?.toLowerCase()) ||
          response.task.title?.toLowerCase().includes(t.title.toLowerCase())
        )
        if (taskToComplete) {
          updateTask(taskToComplete.id, { 
            completed: true, 
            completedAt: new Date().toISOString() 
          })
        }
      } else if (response.action === 'delete_task' && response.task) {
        // Find and delete the task
        const taskToDelete = tasks.find(t => 
          t.title.toLowerCase().includes(response.task.title?.toLowerCase()) ||
          response.task.title?.toLowerCase().includes(t.title.toLowerCase())
        )
        if (taskToDelete) {
          deleteTask(taskToDelete.id)
        }
      }
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="assistant-page">
      <Navbar />
      <div className="assistant-container">
        <div className="chat-column">
          <div className="chat-header">
            <div className="chat-title">
              <h2>AI Task Assistant</h2>
            </div>
            <button 
              className="toggle-tasks-btn"
              onClick={() => setShowTasks(!showTasks)}
            >
              {showTasks ? '← Hide Tasks' : 'Show Tasks →'}
            </button>
          </div>
          <ChatWindow messages={messages} isLoading={isLoading} />
          <ChatInput onSend={sendMessage} disabled={isLoading} />
        </div>
        
        {showTasks && (
          <div className="tasks-column">
            <TaskStats tasks={tasks} />
            <TaskList 
              tasks={tasks} 
              onUpdate={updateTask}
              onDelete={deleteTask}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default AssistantPage
