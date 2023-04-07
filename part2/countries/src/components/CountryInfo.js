import WeatherInfo from './WeatherInfo'

const CountryInfo = ({ country }) => {
  const keys = Object.keys(country)
  const hasCapital = keys.some(key => key === 'capital')
  const capitals = hasCapital
    ? country.capital.join(', ')
    : 'N/A'
  const languages = keys.some(key => key === 'languages')
    ? Object.keys(country.languages).map(lang =>
      <li key={lang}>{country.languages[lang]}</li>
    )
    : <li>N/A</li>
  const weather = hasCapital
    ? <WeatherInfo capital={country.capital[0]} />
    : <p>weather unavailable</p>

  return (
    <>
      <h2>{country.name.common}</h2>

      <div>capital {capitals}</div>
      <div>area {country.area}</div>

      <h4>languages:</h4>
      <ul>{languages}</ul>

      <img src={country.flags.png} alt={`flag of ${country.name.common}`}></img>

      <div>{weather}</div>
    </>
  )
}

export default CountryInfo
