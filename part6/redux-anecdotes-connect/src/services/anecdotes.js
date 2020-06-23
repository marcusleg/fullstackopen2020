import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const newAnecdote = {
    content: content,
    id: (100000 * Math.random()).toFixed(0),
    votes: 0
  }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const vote = async id => {
  let response = await axios.get(`${baseUrl}/${id}`)
  const anecdote = response.data
  const updatedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
  return response.data
}

export default { getAll, create, vote }
