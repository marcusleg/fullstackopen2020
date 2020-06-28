import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const AddBlogForm = ({ setNotificationMessage }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(createBlog(title, author, url))
    setNotificationMessage(`New Blog added: ${title} by ${author}`)
    setTimeout(() => setNotificationMessage(null), 5000)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>Add new blog</h2>
      <form onSubmit={handleSubmit}>
        Title:
        <input type="text"
          id="title"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        Author:
        <input type="text"
          id="author"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        URL:
        <input type="text"
          id="url"
          value={url}
          name="URL"
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <button id="submit-button" type="submit">add</button>
      </form>
    </>
  )
}

export default AddBlogForm
