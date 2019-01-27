import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({ name, number }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  if (total === 0) {
    return (
      <div>
          <p>Ei yhtään palautetta annettu</p>
      </div>
   )
  }
  return ( 
    <div>
    <h1>statistiikka</h1>
    <table>
      <tbody>
        <Statistic name={'hyvä'} number={props.good}></Statistic>
        <Statistic name={'neutraali'} number={props.neutral}></Statistic>
        <Statistic name={'huono'} number={props.bad}></Statistic>
        <Statistic name={'yhteensä'} number={total}></Statistic>
        <Statistic name={'keskiarvo'} number={(props.good*1 + props.bad*-1)/total}></Statistic>
        <Statistic name={'positiivisia'} number={100*(props.good/total) + ' %'}></Statistic>
      </tbody>
    </table>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <div>
        <h1>anna palautetta</h1>
        <Button handleClick={handleGoodClick} text='hyvä' />
        <Button handleClick={handleNeutralClick} text='neutraali' />
        <Button handleClick={handleBadClick} text='huono' />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)