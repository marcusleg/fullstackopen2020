import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes(anecdotes))
  }, [dispatch])

  const vote = (id, content) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`Voted for "${content}"`, 5))
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
