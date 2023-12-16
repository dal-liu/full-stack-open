import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState, useEffect } from 'react'

const Books = props => {
  const [filter, setFilter] = useState('')
  const [genreList, setGenreList] = useState([])
  const [initialized, setInitialized] = useState(false)

  const [allBooks, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    allBooks()
  }, [])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  if (!initialized) {
    setGenreList([
      ...new Set(books.reduce((acc, curr) => acc.concat(curr.genres), [])),
    ])
    setInitialized(true)
  }

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
