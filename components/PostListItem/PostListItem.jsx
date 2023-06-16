import React, { useEffect, useRef, useState } from 'react'
import Button from '@/components/UI/Button'
import parse from 'html-react-parser'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import ClearIcon from '@mui/icons-material/Clear'
import styles from '@/components/PostListItem/index.module.css'
import PostComments from '../PostComments/PostComments'
import { usePostsData } from '@/contexts/postContext'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { modules, formats } from '@/utils/helpers'

const PostListItem = ({ post, showId, showComments, onShow }) => {
  const [posts, setPosts] = usePostsData()
  const [editMode, setEditMode] = useState(false)
  const textRef = useRef(null)
  const { id, text, isLiked } = post
  const [editedText, setEditedText] = useState(text)

  useEffect(() => {
    if (editMode) textRef.current.focus()
  }, [editMode])

  const handleShow = () => {
    onShow(showId)
  }

  const handleLikeClick = () => {
    const newPosts = posts.map(item => {
      if (item.id === id) {
        return { ...item, isLiked: !isLiked }
      } else {
        return item
      }
    })
    setPosts(newPosts)
  }

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const handleEditPost = () => {
    const newPosts = posts.map(item => {
      if (item.id === id) {
        return { ...item, text: editedText }
      } else {
        return item
      }
    })
    setPosts(newPosts)
    toggleEditMode()
  }

  const handleDeleteClick = () => {
    const newPosts = posts.filter(item => item.id !== id)
    setPosts(newPosts)
  }

  return (
    <li className={styles.postItem}>
      {editMode ? (
        <article className="bg-gray-200 text-black pt-5 px-5 flex justify-between">
          <div className="w-11/12 pb-5">
            <ReactQuill
              ref={textRef}
              theme="snow"
              value={editedText}
              onChange={setEditedText}
              modules={modules}
              formats={formats}
            />
          </div>
          <aside className="flex flex-col gap-0">
            <a onClick={toggleEditMode} className="cursor-pointer">
              <ClearIcon />
            </a>
            <a onClick={handleEditPost} className="cursor-pointer">
              <SendOutlinedIcon />
            </a>
          </aside>
        </article>
      ) : (
        <article className="bg-gray-200 text-black pt-5 px-5 flex justify-between">
          <div className="w-full pb-5">{parse(text)}</div>
          <a onClick={toggleEditMode} className="cursor-pointer">
            <EditOutlinedIcon />
          </a>
        </article>
      )}
      <div className="flex justify-between bg-emerald-700">
        <Button onClick={handleLikeClick}>
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          <span> Like</span>
        </Button>
        <Button onClick={handleShow}>
          <ChatBubbleOutlineIcon /> Commnet
        </Button>
        <Button onClick={handleDeleteClick}>
          <DeleteOutlineIcon /> Delete
        </Button>
      </div>
      {showComments && <PostComments post={post} />}
    </li>
  )
}

export default PostListItem
