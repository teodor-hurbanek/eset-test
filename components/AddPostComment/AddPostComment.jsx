import React from 'react'
import TextArea from '../UI/TextArea'
import Button from '../UI/Button'

const AddPostComment = () => {
  const handleAddComment = e => {
    e.preventDefault()
  }
  return (
    <form onSubmit={e => handleAddComment(e)} className="flex">
      <TextArea />
      <Button type={'submit'} style={{ width: 'unset' }}>
        Publish
      </Button>
    </form>
  )
}

export default AddPostComment
