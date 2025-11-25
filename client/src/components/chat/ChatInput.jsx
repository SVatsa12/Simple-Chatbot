import { useState, useEffect } from 'react'

function ChatInput({ onSend, disabled }) {
  const [input, setInput] = useState('')

  useEffect(() => {
    const handleExamplePrompt = (e) => {
      setInput(e.detail)
    }

    window.addEventListener('example-prompt', handleExamplePrompt)
    return () => window.removeEventListener('example-prompt', handleExamplePrompt)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSend(input)
      setInput('')
    }
  }

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message... (e.g., 'Add task: Buy groceries')"
        disabled={disabled}
      />
      <button type="submit" disabled={disabled || !input.trim()}>
        Send
      </button>
    </form>
  )
}

export default ChatInput
