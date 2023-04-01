const Person = ({ person }) => {
  return (
    <div>{person.name} {person.number}</div>
  )
}

const Persons = ({ persons }) => {
  return (
    persons.map(person =>
      <Person key={person.name} person={person} />
    )
  )
}

export default Persons