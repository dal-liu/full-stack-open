import { useState, useEffect } from 'react'
import People from './components/People'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import phonebookService from './services/phonebook'
import './index.css'

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(response => {
        setPeople(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    
    if (newName.length === 0) return
    
    if (!people.some(person => person.name === newName)) {
      phonebookService
        .create(personObject)
        .then(response => {
          setSuccessMessage(`Added ${newName}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setPeople(people.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    } else {
      const person = people.find(person => person.name === newName)
      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )) {
        const changedPerson = { ...person, number: newNumber}
        phonebookService
          .update(person.id, changedPerson)
          .then(response => {
            setSuccessMessage(`Changed ${newName}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
            setPeople(people.map(person => person.name !== newName ? person : response.data))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }
  }

  const deletePersonOf = (id) => {
    const person = people.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService
        .remove(id)
        .then(() => {
          setPeople(people.filter(person => person.id !== id))
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

  const peopleToShow = filter.length === 0
    ? people
    : people.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type='success' message={successMessage} />
      <Notification type='error' message={errorMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm 
        onSubmit={addPerson}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <People 
        people={peopleToShow}
        deletePersonOf={deletePersonOf}
      />
    </div>
  )
}

export default App