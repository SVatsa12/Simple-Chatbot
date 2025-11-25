function TaskStats({ tasks = [] }) {
  const completedToday = tasks.filter(task => {
    const today = new Date().toDateString()
    return task.completed && new Date(task.completedAt).toDateString() === today
  }).length

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.completed).length

  return (
    <div className="task-stats">
      <h3>Statistics</h3>
      <div className="stat">
        <span>Total Tasks:</span>
        <strong>{totalTasks}</strong>
      </div>
      <div className="stat">
        <span>Completed:</span>
        <strong>{completedTasks}</strong>
      </div>
      <div className="stat">
        <span>Completed Today:</span>
        <strong>{completedToday}</strong>
      </div>
    </div>
  )
}

export default TaskStats
