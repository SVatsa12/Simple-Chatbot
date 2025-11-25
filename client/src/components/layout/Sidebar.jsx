import TaskStats from '../tasks/TaskStats'
import TaskFilters from '../tasks/TaskFilters'

function Sidebar({ onFilterChange }) {
  return (
    <aside className="sidebar">
      <TaskStats />
      <TaskFilters onChange={onFilterChange} />
    </aside>
  )
}

export default Sidebar
