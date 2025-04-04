// source: https://www.robinwieruch.de/local-storage-react/

import { useState, useEffect } from 'react'
export const useLocalStorage = (storageKey, fallbackState) => {
  const [value, setValue] = useState(JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState)

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value))
  }, [value, storageKey])

  return [value, setValue]
}

// TODO: try how settingValue works
