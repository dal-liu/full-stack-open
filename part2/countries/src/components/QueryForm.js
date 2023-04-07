const QueryForm = ({ query, handleQueryChange }) => {
  return (
    <div>
      find countries
      <input value={query} onChange={handleQueryChange}></input>
    </div>
  )
}

export default QueryForm