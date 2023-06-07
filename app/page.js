'use client'

import AddPost from '@/components/AddPost/AddPost'
import PostList from '@/components/PostList/PostList'
import { LocalStorageProvider } from '@/contexts/postContext'

export default function Home() {
  return (
    <LocalStorageProvider>
      <AddPost />

      <PostList />
    </LocalStorageProvider>
  )
}
