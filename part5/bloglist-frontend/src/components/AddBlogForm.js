import React, { useState } from 'react'
import blogService from '../services/blogs'

const AddBlogForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    blogService.create(title, author, url).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
  })

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
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        Author:
        <input type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        URL:
        <input type="text"
          value={url}
          name="URL"
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <button type="submit">add</button>
      </form>
    </>
  )
}

export default AddBlogForm
