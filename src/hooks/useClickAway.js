import { useEffect, useRef } from 'react'

const events = ['mousedown', 'touchstart']

const useClickAway = (handler) => {
  const ref = useRef(null)
  const savedHandler = useRef(handler)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleEvent = (e) => {
      !element.contains(e.target) && savedHandler.current(e)
    }

    for (const eventName of events) {
      document.addEventListener(eventName, handleEvent)
    }

    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, handleEvent)
      }
    }
  }, [ref])

  return ref
}

export default useClickAway
