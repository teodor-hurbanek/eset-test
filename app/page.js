'use client'

import AddPost from '@/components/AddPost/AddPost'
import PostList from '@/components/PostList/PostList'
import { LocalStorageProvider } from '@/hooks/useLocalStorage'

export default function Home() {
  return (
    <LocalStorageProvider>
      <AddPost />

      <PostList />
    </LocalStorageProvider>
  )
}
