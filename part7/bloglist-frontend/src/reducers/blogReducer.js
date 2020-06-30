import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'COMMENT':
      const commented = action.data
      return state.map(blog => blog.id === commented.id ? commented : blog)
    case 'CREATE':
      return [...state, action.data]
    case 'DELETE':
      return state.filter(blog => blog.id !== action.data)
    case 'LIKE':
      const liked = action.data
      return state.map(blog => blog.id === liked.id ? liked : blog)
    default:
      return state
  }
}

export const commentBlog = (id, comment) => {
  return dispatch =>{
    blogService.comment(id, comment)
      .then(data => {
        dispatch({
          type: 'COMMENT',
          data,
        })
      })
      .catch(error => console.log(error))
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

export const deleteBlog = (id) => {
  return dispatch => {
    blogService.remove(id)
    .then(() => {
      dispatch({
        type: 'DELETE',
        data: id,
      })
    })
    .catch(error => console.log(error))
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    const data = await blogService.update(blog.id, likedBlog)
    dispatch({
      type: 'LIKE',
      data,
    })
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
