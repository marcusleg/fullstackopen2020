import React, { useState, useEffect } from 'react'
import AddBlogForm from './components/AddBlogForm'
import Blog from './components/Blog'
import Error from './components/Error'
import Login from './components/Login'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import blogService from './services/blogs'

const App = () => {
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const addBlogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null) {
    return (
      <>
        <Notification message={notificationMessage} />
        <Error message={errorMessage} />
        <h2>Log in</h2>
        <Login user={user} setUser={setUser} username={username} setUsername={setUsername} password={password} setPassword={setPassword} setErrorMessage={setErrorMessage} />
      </>
    )
  }

  return (
    <div>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <Login user={user} setUser={setUser} username={username} setUsername={setUsername} password={password} setPassword={setPassword} setErrorMessage={setErrorMessage} />
      <Toggable buttonLabel="new blog" ref={addBlogFormRef}>
        <AddBlogForm blogs={blogs} setBlogs={setBlogs} setNotificationMessage={setNotificationMessage} setErrorMessage={setErrorMessage} addBlogFormRef={addBlogFormRef} />
      </Toggable>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={blogService.update} />
      )}
    </div>
  )
}

export default App
