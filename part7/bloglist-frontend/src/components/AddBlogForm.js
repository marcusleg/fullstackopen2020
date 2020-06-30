import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, TextField, Typography } from '@material-ui/core'
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
      <Typography variant="h3">Add new blog</Typography>
      <form onSubmit={handleSubmit}>
        <TextField type="text"
          required
          id="title"
          value={title}
          label="Title"
          onChange={({ target }) => setTitle(target.value)}
          variant="outlined"
        />
        <br />
        <TextField type="text"
          required
          id="author"
          value={author}
          label="Author"
          onChange={({ target }) => setAuthor(target.value)}
          variant="outlined"
        />
        <br />
        <TextField type="text"
          required
          id="url"
          value={url}
          label="URL"
          onChange={({ target }) => setUrl(target.value)}
          variant="outlined"
        />
        <br />
        <Button id="submit-button" type="submit" variant="contained" color="primary">add</Button>
      </form>
    </>
  )
}

export default AddBlogForm
