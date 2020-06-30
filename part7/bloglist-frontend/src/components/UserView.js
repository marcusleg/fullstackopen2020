import React from 'react'

const UserView = ({ user }) => {
  if (!user) return null

  return (
    <>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {
          user.blogs.map(blog => (
            <li key={blog.id}>{blog.title} by {blog.author}</li>
          ))
        }
      </ul>
    </>
  )
}

export default UserView
