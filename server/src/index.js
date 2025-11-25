import express from 'express'
import { config } from './config/env.js'
import { corsConfig } from './middleware/corsConfig.js'
import { errorHandler } from './middleware/errorHandler.js'
import aiRouter from './routes/aiRouter.js'

const app = express()

// Middleware
app.use(corsConfig)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Request logging
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.path}`)
  next()
})

// Routes
app.use('/api', aiRouter)

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'AI Task Assistant Server is running',
    timestamp: new Date().toISOString()
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path
  })
})

// Error handling
app.use(errorHandler)

// Start server
const PORT = config.port
app.listen(PORT, () => {
  console.log('====================================')
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/health`)
  console.log(`AI Chat endpoint: http://localhost:${PORT}/api/chat`)
  console.log(`Environment: ${config.nodeEnv}`)
  console.log('====================================')
})
