import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import Blogs from './components/Blogs'
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
      <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} setErrorMessage={setErrorMessage} />
      <Switch>
        <Route path="/users">
          <UserContainer />
        </Route>
        <Route path="/">
          <Blogs setNotificationMessage={setNotificationMessage} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
