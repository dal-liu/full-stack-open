const Person = ({ person, deletePerson }) => {
  return (
    <div>
      {person.name} {person.number} &nbsp;
      <button onClick={deletePerson}>delete</button>
    </div>
  )
}

const Persons = ({ persons, deletePersonOf }) => {
  return (
    persons.map(person =>
      <Person 
        key={person.id} 
        person={person}
        deletePerson={() => deletePersonOf(person.id)}
      />
    )
  )
}

export default Persons