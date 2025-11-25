function MessageBubble({ message }) {
  const { role, content, timestamp } = message

  return (
    <div className={`message-bubble ${role}`}>
      <div className="message-content">{content}</div>
      {timestamp && (
        <div className="message-timestamp">
          {new Date(timestamp).toLocaleTimeString()}
        </div>
      )}
    </div>
  )
}

export default MessageBubble
