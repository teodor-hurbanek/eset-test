import { useData } from '@/hooks/useLocalStorage'
import React from 'react'
import AddPostComment from '../AddPostComment/AddPostComment'
import PostCommentItem from '../PostCommentsItem/PostCommentItem'
import styles from '@/components/PostComments/index.module.css'

const PostComments = ({ post }) => {
  const { comments } = post

  if (comments.length === 0) {
    return (
      <div className={'p-5 bg-gray-300 ' + styles.postComments}>
        <p className="text-emerald-700">There are no comments yet.</p>
      </div>
    )
  }

  return (
    <div className={'p-5 bg-gray-300 ' + styles.postComments}>
      <ul className="flex flex-col gap-2 mb-2">
        {comments.map((comment, index) => {
          return <PostCommentItem key={index} comment={comment} />
        })}
      </ul>
      <AddPostComment />
    </div>
  )
}

export default PostComments
