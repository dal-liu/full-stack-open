import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdoteOf } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => 
    state.anecdotes.filter(anecdote => 
      anecdote.content.includes(filter)
    )
  )
  const dispatch = useDispatch()

  const vote = (id) => {
    // console.log('vote', id)
    dispatch(voteAnecdoteOf(id))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
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