import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'CREATE':
      return [...state, action.data]
    default:
      return state
  }
}

export const createBlog = (title, author, url) => {
  return dispatch => {
    blogService.create(title, author, url)
      .then(data => {
        dispatch({
          type: 'CREATE',
          data,
        })
      })
      .catch(error => console.log(error))
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data,
    })
  }
}

export default reducer
