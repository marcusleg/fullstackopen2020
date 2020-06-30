import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog, commentBlog } from '../reducers/blogReducer'

const BlogDetail = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState()

  const handleLike = async () => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = async () => {
    if (!window.confirm(`Do you really want to remove ${blog.title} by ${blog.author}`)) {
      return
    }
    dispatch(deleteBlog(blog.id))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog.id, comment))
    setComment('')
  }

  if (!blog) return null

  return (
    <>
      <h3>{blog.title} by {blog.author}</h3>
      <a href={blog.url}>{blog.url}</a><br />
            likes {blog.likes}<button onClick={handleLike}>like</button><br />
            user {blog.user.name}<br />
      <button onClick={handleRemove}>remove</button>
      <h4>comments</h4>
      <form onSubmit={handleSubmit}>
        <input type="text"
          id="comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </>
  )
}

export default BlogDetail
