import React from 'react'
import PostListItem from '@/components/PostListItem/PostListItem'
import { usePostsData } from '@/contexts/postContext'
import styles from '@/components/PostList/index.module.css'

const PostList = () => {
  const [posts] = usePostsData()

  if (posts.length === 0) {
    return <p className="text-emerald-700 mt-10">There are no posts yet.</p>
  }

  // TODO: open only one comment section. close others

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
