import React, { useEffect, useRef, useState } from 'react'
import AddPostComment from '../AddPostComment/AddPostComment'
import PostCommentsItem from '../PostCommentsItem/PostCommentsItem'
import styles from '@/components/PostComments/index.module.css'

const PostComments = ({ post }) => {
  const [textPlaceholder, setTextPlaceholder] = useState(undefined)
  const [commentId, setCommentId] = useState(undefined)
  const textRef = useRef(null)
  const { comments } = post

  useEffect(() => {
    textRef.current.focus()
  }, [])

  const handleReplyClick = (id, text) => {
    textRef.current.focus()
    const shortenedText = text.substring(0, 10)
    setTextPlaceholder(`Reply to the comment... (${shortenedText}...)`)
    setCommentId(id)
  }

  return (
    <div className={'p-5 bg-gray-300 ' + styles.postComments}>
      {comments.length === 0 ? (
        <p className="text-emerald-700 mb-2">There are no comments yet.</p>
      ) : (
        <ul className="flex flex-col gap-2 mb-2">
          {comments
            .map((comment, index) => {
              return <PostCommentsItem key={index} comment={comment} post={post} onReplyClick={handleReplyClick} />
            })
            .reverse()}
        </ul>
      )}
      <AddPostComment
        post={post}
        commentId={commentId}
        setCommentId={setCommentId}
        ref={textRef}
        placeholder={textPlaceholder}
        setPlaceholder={setTextPlaceholder}
      />
    </div>
  )
}

export default PostComments
