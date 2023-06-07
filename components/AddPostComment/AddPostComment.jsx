import React, { useState, forwardRef } from 'react'
import TextArea from '../UI/TextArea'
import Button from '../UI/Button'
import { usePostsData } from '@/contexts/postContext'

const AddPostComment = forwardRef(({ post, placeholder, commentId, setPlaceholder, setCommentId }, ref) => {
  const [posts, setPosts] = usePostsData()
  const [text, setText] = useState('')

  const handleAddComment = e => {
    e.preventDefault()
    let newPosts = [...posts]
    if (!commentId) {
      const newId = post.comments.length > 0 ? Number([...post.comments].pop().id) + 1 : 1
      newPosts = posts.map(item => {
        if (item.id === post.id) {
          return {
            ...item,
            comments: [...post.comments, { id: newId, text: text.trim(), isLiked: false, comments: [] }],
          }
        } else {
          return item
        }
      })
    } else {
      const newReplys = post.comments.map(item => {
        if (item.id === commentId) {
          return { ...item, comments: [...item.comments, text.trim()] }
        } else {
          return item
        }
      })
      newPosts = posts.map(item => {
        if (item.id === post.id) {
          return { ...item, comments: newReplys }
        } else {
          return item
        }
      })
    }
    setPosts(newPosts)
    setText('')
    setPlaceholder(undefined)
    setCommentId(undefined)
  }

  // TODO: unfocus from reply form and focus to adding a new comment
  // TODO: add comment on enter click

  return (
    <form onSubmit={e => handleAddComment(e)} className="flex">
      <TextArea ref={ref} placeholder={placeholder} value={text} onChange={e => setText(e.target.value)} />
      <Button type={'submit'} style={{ width: 'unset' }} disabled={text.length === 0}>
        Publish
      </Button>
    </form>
  )
})

export default AddPostComment
