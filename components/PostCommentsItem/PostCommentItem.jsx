import React from 'react'

const PostCommentItem = ({ comment }) => {
  const { text } = comment
  return <li className="bg-gray-200 text-black p-2">{text}</li>
}

export default PostCommentItem
