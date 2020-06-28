import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import Blogs from './components/Blogs'
import Error from './components/Error'
import Login from './components/Login'
import Notification from './components/Notification'
import Users from './components/Users'
import blogService from './services/blogs'

const App = () => {
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    <BrowserRouter>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <Login user={user} setUser={setUser} username={username} setUsername={setUsername} password={password} setPassword={setPassword} setErrorMessage={setErrorMessage} />
      <Switch>
        <Route path="/users">
          <Users setNotificationMessage={setNotificationMessage} />
        </Route>
        <Route path="/">
          <Blogs />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
