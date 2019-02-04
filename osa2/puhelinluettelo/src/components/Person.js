import React from 'react'

const Person = ({ person, removePerson }) => {
    return (
      <div>
      {person.name} {person.number} <button id={person.id} name={person.name} onClick={removePerson}>poista</button>
      </div>
    )
}

export default Person