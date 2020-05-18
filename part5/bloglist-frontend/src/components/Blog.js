import React, { useState } from 'react'

const Blog = ({ blog, blogs, setBlogs, updateBlog, removeBlog }) => {
  const [expanded, setExpanded] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleExpanded = () => setExpanded(!expanded)

  const handleLike = async () => {
    const updatedBlog = await updateBlog(blog.id, {
      user: blog.user.id,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    })

    setLikes(updatedBlog.likes)
  }

  const handleRemove = async () => {
    if (!window.confirm(`Do you really want to remove ${blog.title} by ${blog.author}`)) {
      return
    }
    setBlogs(blogs.filter(value => value.id !== blog.id))
    await removeBlog(blog.id)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      {
        expanded ?
          <>
            <button onClick={toggleExpanded}>hide</button><br />
            <a href={blog.url}>{blog.url}</a><br />
            likes {likes}<button onClick={handleLike}>like</button><br />
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
