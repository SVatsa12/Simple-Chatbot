import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/"> AI Task Assistant</Link>
      </div>
      <div className="nav-links">
        <Link to="/assistant">Assistant</Link>
        <Link to="/settings">Settings</Link>
      </div>
    </nav>
  )
}

export default Navbar
