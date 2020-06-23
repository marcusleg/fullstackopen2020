const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

let notificationTimeoutId

export const setNotification = (message, duration) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: message,
    })
    clearTimeout(notificationTimeoutId)
    notificationTimeoutId = setTimeout(() => dispatch({
       type: 'REMOVE_NOTIFICATION'
    }), duration * 1000)
  }
}

export default reducer
