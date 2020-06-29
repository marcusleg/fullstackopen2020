import blogsService from '../services/blogs'
import loginService from '../services/login'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const login = (username, password) => {
  return async dispatch => {
    const data = await loginService.login({ username, password })
    window.localStorage.setItem('loggedUser', JSON.stringify(data))
    blogsService.setToken(data.token)
    dispatch({
      type: 'LOGIN',
      data,
    })
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedUser')
    blogsService.setToken(null)
    dispatch({
      type: 'LOGOUT',
      data: null,
    })
  }
}

export const restoreLoginFromLocalStorage = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogsService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user,
      })
    }
  }
}

export default reducer
