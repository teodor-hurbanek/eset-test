'use client'
import React, { useEffect, useRef, useState } from 'react'
import Label from '@/components/UI/Label'
import Button from '@/components/UI/Button'
import { usePostsData } from '@/contexts/postContext'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styles from './index.module.css'
import { modules, formats } from '@/utils/helpers'

const AddPost = () => {
  const [posts, setPosts] = usePostsData()
  const [text, setText] = useState('')
  const textRef = useRef(null)

  useEffect(() => {
    if (textRef) {
      textRef.current.focus()
    }
  }, [])

  const handleAddPost = e => {
    e.preventDefault()

    const newId = posts.length > 0 ? Number([...posts].pop().id) + 1 : 1

    setPosts([
      ...posts,
      {
        id: newId,
        text,
        isLiked: false,
        comments: [
          // {
          //   id: 1,
          //   text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, nam maiores enim at modi illo! Perferendis consequatur ex enim eum voluptates dolorum adipisci error laudantium? Similique vel autem nemo quis',
          //   isLiked: false,
          //   comments: [
          //     'Acumque fuga, totam ipsa perferendis ea asperiores ab a.',
          //     'Becumque fuga, totam ipsa perferendis ea asperiores ab a.',
          //   ],
          // },
          // {
          //   id: 2,
          //   text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique tenetur earum dicta, sapiente sit, cumque fuga, totam ipsa perferendis ea asperiores ab a. Obcaecati optio, consequuntur quia doloribus ullam minima.',
          //   isLiked: false,
          //   comments: [],
          // },
        ],
      },
    ])
    setText('')
  }

  // TODO: fix add post on enter -> if there is no text and enter is pressed empty post is added

  const handleKeyDown = e => {
    if (text !== '<p><br></p>' && text.length > 0) {
      if (e.key === 'Enter') {
        handleAddPost(e)
      }
    }
  }

  return (
    <form
      onSubmit={e => handleAddPost(e)}
      onKeyDown={e => handleKeyDown(e)}
      className={'flex flex-col ' + styles.addPost}
    >
      <Label>What's on your mind?</Label>
      <ReactQuill ref={textRef} theme="snow" value={text} onChange={setText} modules={modules} formats={formats} />

      <Button type={'submit'} disabled={text === '<p><br></p>' || text.length === 0}>
        Publish
      </Button>
    </form>
  )
}

export default AddPost
