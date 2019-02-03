import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showSearch, setShowSearch ] = useState('')

  useEffect(() => {    
    console.log('effect')    
    axios
      .get('http://localhost:3001/persons')      
      .then(response => {        
        console.log('promise fulfilled')        
        setPersons(response.data)
      })  
  }, [])  

const personsToShow = persons.filter(person => person.name.toLowerCase().includes(showSearch.toLowerCase()))

const rows = () => personsToShow.map(person =>
    <Person
      key={person.name}
      person={person}
    />
)

const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) { 
      window.alert(`${newName} on jo luettelossa`);
    } else {
      const personObject = {
          name: newName,
          number: newNumber,
      }
      setPersons(persons.concat(personObject))
    }

    setNewName('')
    setNewNumber('')
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
      <Filter showSearch={showSearch} handleShowSearch={handleShowSearch} />
      <h2>Lisää uusi</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numerot</h2>
      {rows()}
    </div>
  )

}

export default App