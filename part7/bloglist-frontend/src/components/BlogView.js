import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const BlogDetail = ({ blog }) => {
  const dispatch = useDispatch()

  const handleLike = async () => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = async () => {
    if (!window.confirm(`Do you really want to remove ${blog.title} by ${blog.author}`)) {
      return
    }
    dispatch(deleteBlog(blog.id))
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
      <ul>
        {blog.comments.map(comment => (
          <li>{comment}</li>
        ))}
      </ul>
    </>
  )
}

export default BlogDetail
