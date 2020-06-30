import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import BlogContainer from './components/BlogContainer'
import Error from './components/Error'
import Login from './components/Login'
import Notification from './components/Notification'
import UserContainer from './components/UserContainer'
import { restoreLoginFromLocalStorage } from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(state => state.login)

  useEffect(() => {
    dispatch(restoreLoginFromLocalStorage())
  }, [dispatch])

  const navigationItemStyle = {
    margin: '0 .25rem 0 .25rem'
  }

  if (user === null) {
    return (
      <>
        <Notification message={notificationMessage} />
        <Error message={errorMessage} />
        <h2>Log in</h2>
        <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} setErrorMessage={setErrorMessage} />
      </>
    )
  }

  return (
    <BrowserRouter>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <div style={{ backgroundColor: '#cecece', padding: '0.1rem' }}>
        <span style={navigationItemStyle}>
          <Link to="/">blogs</Link>
        </span>
        <span style={navigationItemStyle}>
          <Link to="/users">users</Link>
        </span>
        <span style={navigationItemStyle}>
          <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} setErrorMessage={setErrorMessage} />
        </span>
      </div>

      <Switch>
        <Route path="/users">
          <UserContainer />
        </Route>
        <Route path="/">
          <BlogContainer setNotificationMessage={setNotificationMessage} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
