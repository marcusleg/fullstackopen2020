import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id, content) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`Voted for "${content}"`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  let filteredAnecdotes = anecdotes
  if (filter !== '') filteredAnecdotes = anecdotes.filter(value => value.content.includes(filter))

  return (
    <>
      {filteredAnecdotes
        .sort((a, b) => a.votes < b.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        )}
    </>
  )
}

export default AnecdoteList
