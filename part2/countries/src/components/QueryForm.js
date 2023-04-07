const QueryForm = ({ query, onChange }) => {
  return (
    <div>
      find countries
      <input value={query} onChange={onChange}></input>
    </div>
  )
}

export default QueryForm