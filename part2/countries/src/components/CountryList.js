import CountryInfo from './CountryInfo'

const CountryList = ({ countries, onClick }) => {
  if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  if (countries.length === 1) {
    return (
      <CountryInfo country={countries[0]} />
    )
  }
  return (
    <div>
      {countries.map(c =>
        <div key={c.cca3}>
          {c.name.common}
          <button onClick={() => onClick([c])}>show</button>
        </div>
      )}
    </div>
  )
}

export default CountryList