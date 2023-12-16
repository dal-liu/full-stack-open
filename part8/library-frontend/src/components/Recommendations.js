import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommendations = ({ show }) => {
  const favoriteResult = useQuery(ME, {
    skip: !localStorage.getItem('library-user-token'),
  })
  const booksResult = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }

  if (booksResult.loading || favoriteResult.loading) {
    return <div>loading...</div>
  }

  const favorite = favoriteResult.data.me
  if (!favorite) {
    return <div>an error occurred</div>
  }

  const books = booksResult.data.allBooks.filter(b =>
    b.genres.includes(favorite.favoriteGenre),
  )

  return (
    <div>
      <h2>recommendations</h2>

      {favorite ? (
        <div>
          books in your favorite genre <b>{favorite.favoriteGenre}</b>
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
    </div>
  )
}

export default Recommendations
