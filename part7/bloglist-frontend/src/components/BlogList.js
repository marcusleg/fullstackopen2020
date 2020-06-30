import React from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <div id={blog.id} className="blog" style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
        </div>
      )
      }
    </>
  )
}

export default BlogList
