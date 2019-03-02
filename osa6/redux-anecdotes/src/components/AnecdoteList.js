import React from 'react';
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  const store = props.store

  const vote = (id) => {
    store.dispatch(
      addVote(id)
    )
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {store.getState().sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList