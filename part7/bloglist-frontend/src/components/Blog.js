import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => setExpanded(!expanded)

  const handleLike = async () => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = async () => {
    if (!window.confirm(`Do you really want to remove ${blog.title} by ${blog.author}`)) {
      return
    }
    dispatch(deleteBlog(blog.id))
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} by {blog.author}
      {
        expanded ?
          <>
            <button onClick={toggleExpanded}>hide</button><br />
            <a href={blog.url}>{blog.url}</a><br />
            likes {blog.likes}<button onClick={handleLike}>like</button><br />
            user {blog.user.name}<br />
            <button onClick={handleRemove}>remove</button>
          </>
          :
          <button onClick={toggleExpanded}>view</button>
      }

    </div>
  )
}

export default Blog
