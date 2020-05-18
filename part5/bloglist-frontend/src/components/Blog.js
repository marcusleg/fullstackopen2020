import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => setExpanded(!expanded)

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
            likes {blog.likes}<br />
            user {blog.user.name}
          </>
          :
          <button onClick={toggleExpanded}>view</button>
      }

    </div>
  )
}

export default Blog
