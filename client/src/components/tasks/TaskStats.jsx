function TaskStats({ tasks = [] }) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.completed).length
  const pendingTasks = totalTasks - completedTasks

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
        <span>Pending:</span>
        <strong>{pendingTasks}</strong>
      </div>
    </div>
  )
}

export default TaskStats
