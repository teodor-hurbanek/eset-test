'use client'
import React, { useEffect, useRef, useState } from 'react'
import Label from '@/components/UI/Label'
import Button from '@/components/UI/Button'
import { useData } from '@/hooks/useLocalStorage'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styles from './index.module.css'

const AddPost = () => {
  const [posts, setPosts] = useData()
  const [text, setText] = useState('')
  const textRef = useRef(null)

  useEffect(() => {
    if (textRef) {
      textRef.current.focus()
    }
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    setPosts([
      ...posts,
      {
        text,
        isLiked: false,
        comments: [
          {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, nam maiores enim at modi illo! Perferendis consequatur ex enim eum voluptates dolorum adipisci error laudantium? Similique vel autem nemo quis',
            comments: [],
          },
          {
            text: '  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique tenetur earum dicta, sapiente sit, cumque fuga, totam ipsa perferendis ea asperiores ab a. Obcaecati optio, consequuntur quia doloribus ullam minima.',
            comments: [],
          },
        ],
      },
    ])
    setText('')
  }

  return (
    <form onSubmit={e => handleSubmit(e)} className={'flex flex-col ' + styles.addPost}>
      <Label>What's on your mind?</Label>
      <ReactQuill ref={textRef} theme="snow" value={text} onChange={setText} />

      <Button type={'submit'} disabled={text === '<p><br></p>' || text.length === 0}>
        Publish
      </Button>
    </form>
  )
}

export default AddPost
