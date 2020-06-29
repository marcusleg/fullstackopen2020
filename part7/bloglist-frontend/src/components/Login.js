import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../reducers/loginReducer'

const Login = ({ username, setUsername, password, setPassword, setErrorMessage }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(login(username, password))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  if (user !== null) {
    return (
      <p>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
    )
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )
}

export default Login
