import React, { useState } from 'react'
import PostListItem from '@/components/PostListItem/PostListItem'
import { usePostsData } from '@/contexts/postContext'
import styles from '@/components/PostList/index.module.css'

const PostList = () => {
  const [posts] = usePostsData()
  const [showId, setShowId] = useState(-1)

  if (posts.length === 0) {
    return <p className="text-emerald-700 mt-10">There are no posts yet.</p>
  }

  const handleShow = id => {
    if (id === showId) {
      setShowId(-1)
    } else {
      setShowId(id)
    }
  }

  return (
    <ul className={'flex flex-col gap-5 mt-10 ' + styles.postList}>
      {posts
        .map((post, index) => {
          return (
            <PostListItem key={index} post={post} showId={index} showComments={showId === index} onShow={handleShow} />
          )
        })
        .reverse()}
    </ul>
  )
}

export default PostList
