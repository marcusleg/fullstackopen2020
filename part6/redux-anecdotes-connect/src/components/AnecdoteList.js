import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  useEffect(() => {
    props.initializeAnecdotes()
  }, [])

  const vote = (id, content) => {
    console.log('vote', id)
    props.voteAnecdote(id)
    props.setNotification(`Voted for "${content}"`, 5)
  }

  let filteredAnecdotes = props.anecdotes
  if (props.filter !== '') filteredAnecdotes = props.anecdotes.filter(value => value.content.includes(props.filter))

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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  initializeAnecdotes,
  voteAnecdote,
  setNotification,
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList
