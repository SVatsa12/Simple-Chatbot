import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import { useTheme } from '../hooks/useTheme'

function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '')

  const handleSave = () => {
    localStorage.setItem('userName', userName)
    alert('Settings saved!')
  }

  return (
    <div className="settings-page">
      <Navbar />
      <div className="settings-content">
        <h1>Settings</h1>
        
        <section>
          <h2>Profile</h2>
          <label>
            Name:
            <input 
              type="text" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
        </section>

        <section>
          <h2>Appearance</h2>
          <label>
            Theme:
            <button onClick={toggleTheme}>
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </label>
        </section>

        <button onClick={handleSave}>Save Settings</button>
      </div>
    </div>
  )
}

export default SettingsPage
