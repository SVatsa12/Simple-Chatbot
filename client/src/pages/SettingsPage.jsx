import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import { useTheme } from '../hooks/useTheme'
import '../styles/settings.css'

function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '')
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || '')
  const [notifications, setNotifications] = useState(localStorage.getItem('notifications') !== 'false')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    localStorage.setItem('userName', userName)
    localStorage.setItem('userEmail', email)
    localStorage.setItem('notifications', notifications)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all tasks? This action cannot be undone.')) {
      localStorage.removeItem('tasks')
      alert('All tasks have been cleared!')
    }
  }

  const handleExportData = () => {
    const tasks = localStorage.getItem('tasks') || '[]'
    const blob = new Blob([tasks], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tasks-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="settings-page">
      <Navbar />
      <div className="settings-container">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Customize your AI Task Assistant experience</p>
        </div>

        <div className="settings-grid">
          {/* Profile Section */}
          <div className="settings-card">
            <div className="card-header">
              <span className="card-icon">👤</span>
              <h2>Profile</h2>
            </div>
            <div className="card-content">
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="settings-input"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="settings-input"
                />
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div className="settings-card">
            <div className="card-header">
              <span className="card-icon">🎨</span>
              <h2>Appearance</h2>
            </div>
            <div className="card-content">
              <div className="theme-toggle">
                <div className="theme-info">
                  <label>Theme</label>
                  <p className="theme-description">Choose your preferred color scheme</p>
                </div>
                <button onClick={toggleTheme} className="theme-btn">
                  {theme === 'light' ? (
                    <>
                      <span className="theme-icon">🌙</span>
                      <span>Dark</span>
                    </>
                  ) : (
                    <>
                      <span className="theme-icon">☀️</span>
                      <span>Light</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="settings-card">
            <div className="card-header">
              <span className="card-icon">🔔</span>
              <h2>Notifications</h2>
            </div>
            <div className="card-content">
              <div className="toggle-item">
                <div className="toggle-info">
                  <label>Enable Notifications</label>
                  <p className="toggle-description">Get notified about upcoming tasks</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Data Management Section */}
          <div className="settings-card">
            <div className="card-header">
              <span className="card-icon">💾</span>
              <h2>Data Management</h2>
            </div>
            <div className="card-content">
              <div className="data-actions">
                <button onClick={handleExportData} className="data-btn export-btn">
                  <span>📥</span>
                  Export Tasks
                </button>
                <button onClick={handleClearData} className="data-btn clear-btn">
                  <span>🗑️</span>
                  Clear All Tasks
                </button>
              </div>
              <p className="data-info">Your tasks are stored locally in your browser</p>
            </div>
          </div>

          {/* About Section */}
          <div className="settings-card">
            <div className="card-header">
              <span className="card-icon">ℹ️</span>
              <h2>About</h2>
            </div>
            <div className="card-content">
              <div className="about-info">
                <div className="info-row">
                  <span className="info-label">Version</span>
                  <span className="info-value">1.0.0</span>
                </div>
                <div className="info-row">
                  <span className="info-label">AI Model</span>
                  <span className="info-value">Llama 3.3 70B (Groq)</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Framework</span>
                  <span className="info-value">React 19.2.0</span>
                </div>
              </div>
              <a href="https://github.com/SVatsa12/Simple-Chatbot" target="_blank" rel="noopener noreferrer" className="github-link">
                View on GitHub →
              </a>
            </div>
          </div>
        </div>

        <div className="settings-footer">
          <button onClick={handleSave} className="save-btn">
            {saved ? '✓ Saved!' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
