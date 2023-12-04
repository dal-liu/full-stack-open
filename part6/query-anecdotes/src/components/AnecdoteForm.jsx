import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../../services/requests.js'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext.jsx'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notificationDispatch({ type: 'CREATE', payload: data.content })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    },
    onError: () => {
      notificationDispatch({ type: 'ERROR', payload: 'too short anecdote, must have length 5 or more' })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
    }
  })

  const [notification, notificationDispatch] = useContext(NotificationContext)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
