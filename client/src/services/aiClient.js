import apiClient from './apiClient'

export async function sendMessageToAI(message, tasks) {
  try {
    const response = await apiClient.post('/chat', {
      message,
      tasks
    })
    return response.data
  } catch (error) {
    console.error('Error communicating with AI:', error)
    throw error
  }
}
