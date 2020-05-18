import React, { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
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
            user {blog.user.name}
          </>
          :
          <button onClick={toggleExpanded}>view</button>
      }

    </div>
  )
}

export default Blog
