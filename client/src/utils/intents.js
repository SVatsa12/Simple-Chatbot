export const INTENTS = {
  ADD_TASK: 'add_task',
  SHOW_TASKS: 'show_tasks',
  UPDATE_TASK: 'update_task',
  DELETE_TASK: 'delete_task',
  MARK_COMPLETE: 'mark_complete',
  GENERAL_CHAT: 'general_chat'
}

export function detectIntent(message) {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes('add') || lowerMessage.includes('create') || lowerMessage.includes('new task')) {
    return INTENTS.ADD_TASK
  }

  if (lowerMessage.includes('show') || lowerMessage.includes('list') || lowerMessage.includes('view tasks')) {
    return INTENTS.SHOW_TASKS
  }

  if (lowerMessage.includes('complete') || lowerMessage.includes('done') || lowerMessage.includes('finish')) {
    return INTENTS.MARK_COMPLETE
  }

  if (lowerMessage.includes('delete') || lowerMessage.includes('remove')) {
    return INTENTS.DELETE_TASK
  }

  if (lowerMessage.includes('update') || lowerMessage.includes('edit') || lowerMessage.includes('change')) {
    return INTENTS.UPDATE_TASK
  }

  return INTENTS.GENERAL_CHAT
}
