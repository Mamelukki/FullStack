import React from 'react';
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.addVote(anecdote)

    props.setNotification(`you voted '${anecdote.content}'`, 5)
  }

  return (
    <div>
      {props.visibleAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  const anecdotesToShow = filter === null
    ? anecdotes
    : anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  
  return anecdotesToShow
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)