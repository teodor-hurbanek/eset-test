import React, { useEffect, useRef, useState } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ReplyIcon from '@mui/icons-material/Reply'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import ClearIcon from '@mui/icons-material/Clear'
import { usePostsData } from '@/contexts/postContext'
import TextArea from '../UI/TextArea'

const PostCommentsItem = ({ comment, post, onReplyClick }) => {
  const [posts, setPosts] = usePostsData()
  const [readMore, setReadMore] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const { id: postId } = post
  const { id: commentId, text, isLiked, comments } = comment
  const [editedText, setEditedText] = useState(text)
  const textRef = useRef(null)

  useEffect(() => {
    if (editMode) textRef.current.select()
  }, [editMode])

  const getShortenedText = text => {
    if (!readMore) {
      return text.substring(0, 205)
    } else {
      return text
    }
  }

  const toggleReadMore = () => {
    setReadMore(!readMore)
  }

  const handleLikeClick = () => {
    const newComments = post.comments.map(item => {
      if (item.id === commentId) {
        return { ...item, isLiked: !isLiked }
      } else {
        return item
      }
    })
    const newPosts = posts.map(item => {
      if (item.id === postId) {
        return { ...item, comments: newComments }
      } else {
        return item
      }
    })
    setPosts(newPosts)
  }

  const handleReplyClick = () => {
    onReplyClick(commentId, text)
  }

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const handleEditComment = () => {
    const newComments = post.comments.map(item => {
      if (item.id === commentId) {
        return { ...item, text: editedText }
      } else {
        return item
      }
    })
    const newPosts = posts.map(item => {
      if (item.id === postId) {
        return { ...item, comments: newComments }
      } else {
        return item
      }
    })
    setPosts(newPosts)
    toggleEditMode()
  }

  const handleDeleteClick = () => {
    const newComments = post.comments.filter(item => item.id !== commentId)
    const newPosts = posts.map(item => {
      if (item.id === postId) {
        return { ...item, comments: newComments }
      } else {
        return item
      }
    })
    setPosts(newPosts)
  }

  return (
    <li className="text-black">
      {editMode ? (
        <section className="bg-gray-200 p-2 relative">
          <TextArea
            ref={textRef}
            value={editedText}
            onChange={e => setEditedText(e.target.value)}
            className="w-11/12"
          />
          <div className="absolute top-1 right-1 flex flex-col gap-0">
            <a onClick={toggleEditMode} className="cursor-pointer">
              <ClearIcon />
            </a>
            <a onClick={handleEditComment} className="cursor-pointer">
              <SendOutlinedIcon />
            </a>
          </div>
        </section>
      ) : (
        <section className="bg-gray-200 py-2 pl-2 pr-4 relative">
          {text.length >= 205 ? (
            <div className="relative">
              {getShortenedText(text)}
              {!readMore ? (
                <a onClick={toggleReadMore} className="absolute bottom-0 right-2 bg-gray-200 cursor-pointer">
                  Show more...
                </a>
              ) : (
                <a onClick={toggleReadMore} className="absolute bottom-0 right-2 bg-gray-200 cursor-pointer">
                  Show less
                </a>
              )}
            </div>
          ) : (
            <div>{text}</div>
          )}

          <a onClick={toggleEditMode} className="absolute top-1 right-1 cursor-pointer">
            <EditOutlinedIcon />
          </a>

          <div className="flex justify-end gap-5 p-1">
            <a onClick={handleLikeClick} className="cursor-pointer">
              {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              <span> Like</span>
            </a>
            <a onClick={handleReplyClick} className="cursor-pointer">
              <ReplyIcon /> Reply
            </a>
            <a onClick={handleDeleteClick} className="cursor-pointer">
              <DeleteOutlineIcon /> Delete
            </a>
          </div>
        </section>
      )}

      {comments.length !== 0 && (
        <ul className="w-10/12 flex flex-col gap-2 mt-2 ml-auto">
          {comments
            .map((item, index) => {
              return (
                <li key={index} className="bg-gray-200 px-2 py-1">
                  {item}
                </li>
              )
            })
            .reverse()}
        </ul>
      )}
    </li>
  )
}

export default PostCommentsItem
