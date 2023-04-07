import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import QueryForm from './components/QueryForm'
import CountryList from './components/CountryList'

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    console.log('fetching country data...');
    countriesService
      .getAll()
      .then(response => {
        // console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  const countriesToShow = query
    ? countries.filter(c =>
      c.name.common.toUpperCase().includes(query.toUpperCase())
    )
    : []

  return (
    <div>
      <QueryForm query={query} handleQueryChange={handleQueryChange} />
      <CountryList countries={countriesToShow} />
    </div>
  )
}

export default App
