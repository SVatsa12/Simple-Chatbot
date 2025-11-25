import { processMessage } from '../services/geminiClient.js'

export async function handleChatRequest(req, res, next) {
  try {
    const { message, tasks = [] } = req.body

    // Validation
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        error: 'Message is required and must be a string',
        success: false
      })
    }

    if (message.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Message cannot be empty',
        success: false
      })
    }

    if (!Array.isArray(tasks)) {
      return res.status(400).json({ 
        error: 'Tasks must be an array',
        success: false
      })
    }

    console.log(`💬 Processing message: "${message.substring(0, 50)}${message.length > 50 ? '...' : ''}"`)
    console.log(`📋 Current tasks count: ${tasks.length}`)

    const response = await processMessage(message, tasks)
    
    console.log(`✅ Action determined: ${response.action}`)
    
    res.json({
      success: true,
      ...response
    })
  } catch (error) {
    console.error('❌ Error in chat controller:', error.message)
    next(error)
  }
}
