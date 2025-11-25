import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import '../styles/landing.css'

function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="nav-logo">
          <span className="logo-icon"></span>
          <span className="logo-text">AI Task Assistant</span>
        </div>
        <button className="nav-cta" onClick={() => navigate('/assistant')}>
          Get Started →
        </button>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Manage Tasks with
            <span className="gradient-text"> AI Power</span>
          </h1>
          <p className="hero-subtitle">
            Your intelligent companion that understands natural language,
            organizes your tasks, and keeps you productive—all while keeping
            your data private with local storage.
          </p>
          <div className="hero-buttons">
            <Button onClick={() => navigate('/assistant')} className="btn-primary">
              Get Started
            </Button>
            <button className="btn-secondary" onClick={() => {
              document.getElementById('features').scrollIntoView({ behavior: 'smooth' })
            }}>
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="chat-preview">
            <div className="chat-bubble user">
              Add task: Buy groceries tomorrow
            </div>
            <div className="chat-bubble assistant">
              ✓ Added "Buy groceries" for tomorrow!
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Chat Naturally</h3>
            <p>Type your tasks in plain English, just like texting a friend.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>AI Understands</h3>
            <p>Gemini AI interprets your intent and extracts task details.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Stay Organized</h3>
            <p>View, filter, and manage your tasks with a clean interface.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Organized?</h2>
          <p>Start managing your tasks smarter, not harder.</p>
          <Button onClick={() => navigate('/assistant')} className="btn-large">
            Get Started Now
          </Button>
        </div>
      </section>

      <footer className="landing-footer">
        <p>Built with React, Vite, and Google Gemini AI</p>
        <p>© 2025 AI Task Assistant. Your data stays yours.</p>
      </footer>
    </div>
  )
}

export default LandingPage
