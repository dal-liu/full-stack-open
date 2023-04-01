const PersonForm = ({ onSubmit, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:
        <input value={newName} onChange={handleNameChange}></input>
      </div>
      <div>
        number:
        <input value={newNumber} onChange={handleNumberChange}></input>
      </div>
      <button type="submit">add</button>
    </form>
  )
}

export default PersonForm