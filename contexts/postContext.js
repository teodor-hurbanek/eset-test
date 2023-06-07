import { createContext, useContext } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

const LocalStorageContext = createContext(null)

export const LocalStorageProvider = ({ children }) => {
  const [value, setValue] = useLocalStorage('posts', [])

  return <LocalStorageContext.Provider value={[value, setValue]}>{children}</LocalStorageContext.Provider>
}

export const usePostsData = () => {
  return useContext(LocalStorageContext)
}
