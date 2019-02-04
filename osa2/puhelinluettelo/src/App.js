import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Error from './components/Error'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showSearch, setShowSearch ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {    
    console.log('effect')    
    axios
      .get('http://localhost:3002/persons')      
      .then(response => {        
        console.log('promise fulfilled')        
        setPersons(response.data)
      })  
  }, [])  

const personsToShow = persons.filter(person => person.name.toLowerCase().includes(showSearch.toLowerCase()))

const rows = () => personsToShow.map(person =>
    <Person
      key={person.id}
      person={person}
      removePerson={() => removePerson(person.id)}
    />
)

const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) { 
      alert(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`);
      const person = persons.find(p => p.name === newName)
      const changedPerson = { ...person, number: newNumber }

      personService
        .update(person.id, changedPerson)
          .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          setMessage(
            `Päivitettiin henkilön '${person.name} numero'`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }).catch(error => {
            setErrorMessage(
              `Henkilö ${person.name} on jo poistettu`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
    } else {
      const personObject = {
          name: newName,
          number: newNumber,
      }

      personService
      .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))

        setMessage(
          `Lisättiin '${returnedPerson.name}'`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }) 
    }

    setNewName('')
    setNewNumber('')
}

const removePerson = id => {
  const person = persons.find(p => p.id === id)
  window.confirm(`Poistetaanko ${person.name}`);

  personService
    .remove(id)
      .then(response => {        
        setPersons(persons.filter(p => p.id !== id))

        setMessage(
          `Poistettiin '${person.name}'`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
}


const handleNameChange = (event) => {
    setNewName(event.target.value)
}

const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
}

const handleShowSearch = (event) => {
    setShowSearch(event.target.value)
}

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification message={message} />
      <Error message={errorMessage} />
      <Filter showSearch={showSearch} handleShowSearch={handleShowSearch} />
      <h2>Lisää uusi</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numerot</h2>
      {rows()} 
    </div>
  )

}

export default App