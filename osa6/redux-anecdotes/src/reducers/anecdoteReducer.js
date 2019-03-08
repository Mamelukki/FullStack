import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.anecdote.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { ...anecdoteToChange, 
        votes: action.data.anecdote.votes
      }
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    case 'INIT_ANECDOTES':      
      return action.data
    default: 
      return state
  }
}

export const createAnecdote= content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'VOTE',
      data: { anecdote: updatedAnecdote }
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer