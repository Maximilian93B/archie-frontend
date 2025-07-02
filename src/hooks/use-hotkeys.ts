import { useEffect } from 'react'

type KeyHandler = (event: KeyboardEvent) => void

export function useHotkeys(key: string, handler: KeyHandler) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keys = key.toLowerCase().split('+')
      const pressedKey = event.key.toLowerCase()
      
      // Check modifiers
      const hasCmd = keys.includes('cmd') || keys.includes('meta')
      const hasCtrl = keys.includes('ctrl')
      const hasShift = keys.includes('shift')
      const hasAlt = keys.includes('alt')
      
      // Get the actual key (last part)
      const actualKey = keys[keys.length - 1]
      
      // Check if all modifiers match
      const modifiersMatch = 
        (hasCmd ? event.metaKey : !event.metaKey) &&
        (hasCtrl ? event.ctrlKey : !event.ctrlKey) &&
        (hasShift ? event.shiftKey : !event.shiftKey) &&
        (hasAlt ? event.altKey : !event.altKey)
      
      // Check if key matches
      if (modifiersMatch && pressedKey === actualKey) {
        event.preventDefault()
        handler(event)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [key, handler])
}