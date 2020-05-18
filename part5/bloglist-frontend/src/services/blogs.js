import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (title, author, url) => {
  const config = {
    headers: { Authorization: token },
  }

  const newBlog = {
    title: title,
    author: author,
    url: url,
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return response.data
}

export default {
  getAll,
  create,
  update,
  setToken,
}
