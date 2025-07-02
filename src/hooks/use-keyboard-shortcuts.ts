import { useEffect, useCallback } from 'react'

interface KeyboardShortcut {
  key: string
  ctrlKey?: boolean
  metaKey?: boolean
  altKey?: boolean
  shiftKey?: boolean
  callback: () => void
  preventDefault?: boolean
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    for (const shortcut of shortcuts) {
      const {
        key,
        ctrlKey = false,
        metaKey = false,
        altKey = false,
        shiftKey = false,
        callback,
        preventDefault = true
      } = shortcut

      const isMatch = 
        event.key === key &&
        event.ctrlKey === ctrlKey &&
        event.metaKey === metaKey &&
        event.altKey === altKey &&
        event.shiftKey === shiftKey

      if (isMatch) {
        if (preventDefault) {
          event.preventDefault()
        }
        callback()
        break
      }
    }
  }, [shortcuts])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options: {
    ctrlKey?: boolean
    metaKey?: boolean
    altKey?: boolean
    shiftKey?: boolean
    preventDefault?: boolean
  } = {}
) {
  useKeyboardShortcuts([{ key, callback, ...options }])
}