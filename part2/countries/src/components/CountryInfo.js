const CountryInfo = ({ country }) => {
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

export default CountryInfo