import { useState, useEffect } from 'react'
import { getTasks, saveTasks } from '../services/localStorageService'

export function useTasks() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    setTasks(getTasks())
  }, [])

  const addTask = (task) => {
    const newTask = {
      id: Date.now().toString(),
      ...task,
      completed: false,
      createdAt: new Date().toISOString()
    }
    const updatedTasks = [...tasks, newTask]
    setTasks(updatedTasks)
    saveTasks(updatedTasks)
  }

  const updateTask = (id, updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, ...updatedTask } : task
    )
    setTasks(updatedTasks)
    saveTasks(updatedTasks)
  }

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id)
    setTasks(updatedTasks)
    saveTasks(updatedTasks)
  }

  return { tasks, addTask, updateTask, deleteTask }
}
