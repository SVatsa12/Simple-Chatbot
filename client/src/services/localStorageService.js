const TASKS_KEY = 'ai_assistant_tasks'
const SETTINGS_KEY = 'ai_assistant_settings'

export function getTasks() {
  try {
    const tasks = localStorage.getItem(TASKS_KEY)
    return tasks ? JSON.parse(tasks) : []
  } catch (error) {
    console.error('Error reading tasks from localStorage:', error)
    return []
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error)
  }
}

export function getSettings() {
  try {
    const settings = localStorage.getItem(SETTINGS_KEY)
    return settings ? JSON.parse(settings) : {}
  } catch (error) {
    console.error('Error reading settings from localStorage:', error)
    return {}
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  } catch (error) {
    console.error('Error saving settings to localStorage:', error)
  }
}
