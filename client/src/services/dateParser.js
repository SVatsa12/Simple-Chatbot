export function parseNaturalDate(input) {
  const lowerInput = input.toLowerCase()
  const today = new Date()

  if (lowerInput.includes('today')) {
    return today
  }

  if (lowerInput.includes('tomorrow')) {
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow
  }

  if (lowerInput.includes('next week')) {
    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)
    return nextWeek
  }

  // Try to parse as ISO date
  const parsed = new Date(input)
  return isNaN(parsed.getTime()) ? null : parsed
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
