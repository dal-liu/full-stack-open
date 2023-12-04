import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from '../services/requests.js'
import { useReducer } from 'react'
import NotificationContext from './NotificationContext.jsx'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return `anecdote '${action.payload}' created`
    case 'VOTE':
      return `anecdote '${action.payload}' voted`
    case 'CLEAR':
      return ''
    case 'ERROR':
      return action.payload
    default:
      return state
  }
}

const App = () => {
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    notificationDispatch({ type: 'VOTE', payload: anecdote.content })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
    refetchOnWindowFocus: false
  })
  // console.log(JSON.parse(JSON.stringify(result)))

  if (result.isPending) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <NotificationContext.Provider value={[ notification, notificationDispatch]}>
        <Notification />
        <AnecdoteForm />
      </NotificationContext.Provider>

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
