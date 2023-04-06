import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    
    if (newName.length === 0) return
    
    if (!persons.some(p => p.name === newName)) {
      phonebookService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    } else {
      const person = persons.find(p => p.name === newName)
      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )) {
        const changedPerson = { ...person, number: newNumber}
        phonebookService
          .update(person.id, changedPerson)
          .then(response => {
            setPersons(persons.map(p => p.name !== newName ? p : response.data))
            setNewName('')
            setNewNumber('')
          })
      }
    }
  }

  const deletePersonOf = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter.length === 0
    ? persons
    : persons.filter(p => p.name.toUpperCase().includes(filter.toUpperCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      
      <PersonForm 
        onSubmit={addPerson}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons 
        persons={personsToShow}
        deletePersonOf={deletePersonOf}
      />
    </div>
  )
}

export default App