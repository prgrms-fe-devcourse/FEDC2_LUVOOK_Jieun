export const formatTime = (unFormattedTime) => {
  const date = new Date(unFormattedTime)
  const day = date.toLocaleDateString()
  const time = date.toTimeString().slice(0, 5)
  return `${day} ${time}`
}
