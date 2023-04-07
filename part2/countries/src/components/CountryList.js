const Country = ({ country }) => {
  const keys = Object.keys(country)
  const capitals = keys.some(key => key === 'capital')
    ? country.capital.join(', ')
    : 'N/A'
  const languages = keys.some(key => key === 'languages')
    ? Object.keys(country.languages).map(lang =>
      <li key={lang}>{country.languages[lang]}</li>
    )
    : <li>N/A</li>

  return (
    <>
      <h2>{country.name.common}</h2>

      <div>capital {capitals}</div>
      <div>area {country.area}</div>

      <h3>languages:</h3>

      <ul>{languages}</ul>

      <img src={country.flags.png}></img>
    </>
  )
}

const CountryList = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  }
  return (
    <div>
      {countries.map(c =>
        <div key={c.cca2}>{c.name.common}</div>
      )}
    </div>
  )
}

export default CountryList