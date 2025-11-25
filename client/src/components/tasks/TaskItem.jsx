import Card from '../common/Card'

function TaskItem({ task, onUpdate, onDelete }) {
  const toggleComplete = () => {
    onUpdate(task.id, { ...task, completed: !task.completed })
  }

  return (
    <Card className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleComplete}
      />
      <div className="task-details">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        {task.dueDate && (
          <span className="due-date">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
        {task.priority && (
          <span className={`priority priority-${task.priority}`}>
            {task.priority}
          </span>
        )}
      </div>
      <button onClick={() => onDelete(task.id)}>🗑️</button>
    </Card>
  )
}

export default TaskItem
