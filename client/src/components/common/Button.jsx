function Button({ children, onClick, disabled, type = 'button', className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className || 'btn'}
    >
      {children}
    </button>
  )
}

export default Button
