import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [showSearch, setShowSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(showSearch.toLowerCase()))

  const rows = () => {
    if (countriesToShow.length > 10) {
      return (
          <div>
              Too many matches, specify another filter
          </div>
      )
    } else if (countriesToShow.length === 1) {
      return (
        countriesToShow.map(country =>
          <div>
              <h2>{country.name}</h2>
              <div>capital {country.capital}</div>
              <div>population {country.population}</div>
              <h3>languages</h3>
              <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
              </ul>
              <img src={country.flag} width= "10%" height= "10%" alt={country.name} /> 
          </div>
        )
      )
    } else {
      return(
        countriesToShow.map(country =>
          <div>
            {country.name} 
            <button id={country.name} onClick={handleClick}>show</button>
          </div>
        )
      )
    }
  }

  const handleShowSearch = (event) => {
    setShowSearch(event.target.value)
  }

  const handleClick = (event) => {
    setShowSearch(event.target.id)
  }

  return (
    <div>
      <form>
        <div>
          find countries: <input
          value={showSearch} 
          onChange={handleShowSearch}
          />
        </div>
      </form>
      {rows()}
    </div>
  )

}

export default App;