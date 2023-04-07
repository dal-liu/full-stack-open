import { useState, useEffect } from 'react'
import axios from 'axios'
import QueryForm from './components/QueryForm'
import CountryList from './components/CountryList'

const App = () => {
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    console.log('fetching country data...');
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
    const newQuery = event.target.value
    if (newQuery) {
      setCountries(allCountries.filter(c => 
        c.name.common.toUpperCase().includes(newQuery.toUpperCase())
      ))
    } else {
      setCountries([])
    }
  }

  return (
    <div>
      <QueryForm query={query} onChange={handleQueryChange} />
      <CountryList countries={countries} onClick={setCountries}/>
    </div>
  )
}

export default App
