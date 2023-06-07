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

const PostListItem = ({ post }) => {
  const [posts, setPosts] = usePostsData()
  const [readMore, setReadMore] = useState(false)
  const [isLongText, setIsLongText] = useState(false)
  const [areCommentsShowed, setAreCommentsShowed] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const articleRef = useRef(null)
  const textRef = useRef(null)
  const { id, text, isLiked } = post
  const [editedText, setEditedText] = useState(text)

  // TODO: when a post is changed there is a bug with height and scroll of the post article
  useEffect(() => {
    if (articleRef.current) {
      if (articleRef.current.clientHeight === 336) {
        setIsLongText(true)
      }
    }
  }, [])

  useEffect(() => {
    if (editMode) textRef.current.focus()
  }, [editMode])

  const handleShowMoreClick = () => {
    if (readMore) {
      articleRef.current.style.maxHeight = '21rem'
      setReadMore(false)
    } else {
      articleRef.current.style.maxHeight = 'unset'
      setReadMore(true)
    }
  }

  const toggleShowComments = () => {
    setAreCommentsShowed(!areCommentsShowed)
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
        <article className="bg-gray-200 text-black p-5 relative">
          <div className="w-11/12">
            <ReactQuill
              ref={textRef}
              theme="snow"
              value={editedText}
              onChange={setEditedText}
              modules={modules}
              formats={formats}
            />
          </div>
          <div className="absolute top-1 right-1 flex flex-col gap-0">
            <a onClick={toggleEditMode} className="cursor-pointer">
              <ClearIcon />
            </a>
            <a onClick={handleEditPost} className="cursor-pointer">
              <SendOutlinedIcon />
            </a>
          </div>
        </article>
      ) : (
        <article ref={articleRef} className="bg-gray-200 text-black p-5 relative">
          {isLongText && (
            <div>
              {!readMore ? (
                <a onClick={handleShowMoreClick} className="absolute bottom-1 right-5 px-1 bg-gray-200 cursor-pointer">
                  Show more...
                </a>
              ) : (
                <a onClick={handleShowMoreClick} className="absolute bottom-1 right-3 px-1 bg-gray-200 cursor-pointer">
                  Show less
                </a>
              )}
            </div>
          )}
          {parse(text)}
          <a onClick={toggleEditMode} className="absolute top-1 right-1 cursor-pointer">
            <EditOutlinedIcon />
          </a>
        </article>
      )}
      <div className="flex justify-between bg-emerald-700">
        <Button onClick={handleLikeClick}>
          {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          <span> Like</span>
        </Button>
        <Button onClick={toggleShowComments}>
          <ChatBubbleOutlineIcon /> Commnet
        </Button>
        <Button onClick={handleDeleteClick}>
          <DeleteOutlineIcon /> Delete
        </Button>
      </div>
      {areCommentsShowed && <PostComments post={post} />}
    </li>
  )
}

export default PostListItem
