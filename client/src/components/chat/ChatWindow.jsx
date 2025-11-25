import MessageBubble from './MessageBubble'
import Loader from '../common/Loader'

function ChatWindow({ messages, isLoading }) {
  const examplePrompts = [
    "Add task: Buy groceries tomorrow",
    "Show me my tasks for today",
    "Create a meeting reminder for 3pm",
    "Mark task as complete"
  ]

  const handleExampleClick = (prompt) => {
    // This will be handled by parent component
    const event = new CustomEvent('example-prompt', { detail: prompt })
    window.dispatchEvent(event)
  }

  return (
    <div className="chat-window">
      {messages.length === 0 && !isLoading ? (
        <div className="empty-chat">
          <div className="empty-chat-icon">💬</div>
          <h3>Start a Conversation</h3>
          <p>Ask me to add tasks, show your schedule, or manage your to-do list</p>
          <div className="example-prompts">
            {examplePrompts.map((prompt, index) => (
              <button
                key={index}
                className="example-prompt"
                onClick={() => handleExampleClick(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
          {isLoading && <Loader />}
        </>
      )}
    </div>
  )
}

export default ChatWindow
