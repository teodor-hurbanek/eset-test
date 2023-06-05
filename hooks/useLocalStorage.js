// source: https://www.robinwieruch.de/local-storage-react/

import { useState, useEffect, createContext, useContext } from 'react'
const useLocalStorage = (storageKey, fallbackState) => {
  const [value, setValue] = useState(JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState)

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value))
  }, [value, storageKey])

  return [value, setValue]
}

const LocalStorageContext = createContext(null)

export const LocalStorageProvider = ({ children }) => {
  const [value, setValue] = useLocalStorage('posts', [])

  return <LocalStorageContext.Provider value={[value, setValue]}>{children}</LocalStorageContext.Provider>
}

export const useData = () => {
  return useContext(LocalStorageContext)
}
