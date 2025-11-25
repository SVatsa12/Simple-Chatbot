function TaskFilters({ onChange }) {
  const filters = [
    { value: 'all', label: 'All Tasks' },
    { value: 'today', label: 'Today' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'completed', label: 'Completed' }
  ]

  return (
    <div className="task-filters">
      <h3>Filter Tasks</h3>
      {filters.map(filter => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}

export default TaskFilters
