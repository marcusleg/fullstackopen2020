import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Button, Container, Toolbar, Typography } from '@material-ui/core'
import BlogContainer from './components/BlogContainer'
import Error from './components/Error'
import Login from './components/Login'
import Notification from './components/Notification'
import UserContainer from './components/UserContainer'
import { restoreLoginFromLocalStorage } from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '0 0.25rem 0 0.25rem',
  },
}))

const App = () => {
  const classes = useStyles()
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
    <Container>
      <BrowserRouter>
        <Notification message={notificationMessage} />
        <Error message={errorMessage} />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h5">Blog List</Typography>
              <Button component={Link} to="/" variant="contained" className={classes.button} color="secondary">blogs</Button>
              <Button component={Link} to="/users" variant="contained" color="secondary">users</Button>
            <span style={navigationItemStyle}>
              <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} setErrorMessage={setErrorMessage} />
            </span>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route path="/users">
            <UserContainer />
          </Route>
          <Route path="/">
            <BlogContainer setNotificationMessage={setNotificationMessage} />
          </Route>
        </Switch>
      </BrowserRouter>
    </Container>
  )
}

export default App
