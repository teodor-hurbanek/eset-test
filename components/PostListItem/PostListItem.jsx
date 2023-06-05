import React, { useEffect, useRef, useState } from 'react'
import Button from '@/components/UI/Button'
import parse from 'html-react-parser'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import styles from '@/components/PostListItem/index.module.css'
import PostComments from '../PostComments/PostComments'

const PostListItem = ({ post }) => {
  const [isMoreShowed, setIsMoreShowed] = useState(false)
  const [isLongText, setIsLongText] = useState(false)
  const [areCommentsShowed, setAreCommentsShowed] = useState(false)
  const articleRef = useRef(null)
  const { text, isLiked, comments } = post

  useEffect(() => {
    if (articleRef.current.clientHeight === 336) {
      setIsLongText(true)
    }
  }, [])

  const handleShowMore = () => {
    if (isMoreShowed) {
      articleRef.current.style.maxHeight = '21rem'
      setIsMoreShowed(false)
    } else {
      articleRef.current.style.maxHeight = 'unset'
      setIsMoreShowed(true)
    }
  }

  const toggleShowComments = () => {
    setAreCommentsShowed(!areCommentsShowed)
  }

  return (
    <li className={styles.postItem}>
      <article ref={articleRef} className="bg-gray-200 text-black p-5 relative">
        {isLongText && (
          <div>
            {!isMoreShowed ? (
              <a onClick={handleShowMore} className="absolute bottom-1 right-3 bg-gray-200 cursor-pointer">
                Show more...
              </a>
            ) : (
              <a onClick={handleShowMore} className="absolute bottom-1 right-3 bg-gray-200 cursor-pointer">
                Show less
              </a>
            )}
          </div>
        )}
        {parse(text)}
      </article>
      <div className="flex justify-between bg-emerald-700">
        <Button>
          {isLiked ? (
            <div>
              <FavoriteIcon /> Dislike
            </div>
          ) : (
            <div>
              <FavoriteBorderIcon /> Like
            </div>
          )}
        </Button>
        <Button onClick={toggleShowComments}>
          <ChatBubbleOutlineIcon /> Commnet
        </Button>
        <Button>
          <DeleteOutlineIcon /> Delete
        </Button>
      </div>
      {areCommentsShowed && <PostComments post={post} />}
    </li>
  )
}

export default PostListItem
