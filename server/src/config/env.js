import dotenv from 'dotenv'

dotenv.config()

export const config = {
  port: process.env.PORT || 5000,
  groqApiKey: process.env.GROQ_API_KEY,
  nodeEnv: process.env.NODE_ENV || 'development'
}

// Validate required environment variables
if (!config.groqApiKey) {
  console.error('❌ GROQ_API_KEY is required in .env file')
  process.exit(1)
}
