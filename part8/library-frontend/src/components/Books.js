import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState, useEffect } from 'react'

const Books = props => {
  const [filter, setFilter] = useState('')

  const result = useQuery(ALL_BOOKS)
  const [allBooks, lazyResult] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    allBooks()
  }, [allBooks])

  if (!props.show) {
    return null
  }

  if (result.loading || lazyResult.loading) {
    return <div>loading...</div>
  }

  const completeBooks = result.data.allBooks
  const books = lazyResult.data.allBooks

  const genreList = [
    ...new Set(
      completeBooks.reduce((acc, curr) => acc.concat(curr.genres), []),
    ),
  ]

  const handleFilterChange = event => {
    setFilter(event.target.value)
    event.target.value
      ? allBooks({ variables: { genre: event.target.value } })
      : allBooks()
  }

  return (
    <div>
      <h2>books</h2>

      {filter ? (
        <div>
          in genre <b>{filter}</b>
        </div>
      ) : null}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genreList.map(g => (
        <button key={g} value={g} onClick={handleFilterChange}>
          {g}
        </button>
      ))}
      <button value={''} onClick={handleFilterChange}>
        all genres
      </button>
    </div>
  )
}

export default Books
