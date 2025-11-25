import TaskItem from './TaskItem'

function TaskList({ tasks, onUpdate, onDelete }) {
  return (
    <div className="task-list">
      <h2>Tasks ({tasks.length})</h2>
      {tasks.length === 0 ? (
        <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
          No tasks yet. Start by asking the AI to add a task!
        </p>
      ) : (
        tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  )
}

export default TaskList
