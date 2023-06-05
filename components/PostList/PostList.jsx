import React from 'react'
import PostListItem from '@/components/PostListItem/PostListItem'
import { useData } from '@/hooks/useLocalStorage'
import styles from '@/components/PostList/index.module.css'

const PostList = () => {
  const [posts] = useData()

  if (posts.length === 0) {
    return <p className="text-emerald-700 mt-10">There are no posts yet.</p>
  }

  return (
    <ul className={'flex flex-col gap-5 mt-10 ' + styles.postList}>
      {posts
        .map((post, index) => {
          return <PostListItem key={index} post={post} />
        })
        .reverse()}
    </ul>
  )
}

export default PostList
