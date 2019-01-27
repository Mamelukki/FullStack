import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>{props.name}</h1>
    )
}

const Part = (props) => {
    return (
      <div>
        <p>
          {props.name} {props.exercises}
        </p>
      </div>
    )
}

const Content = (props) => {
    return (
      <div>
        <Part name={props.course.parts[0].name} exercises={props.course.parts[0].exercises} />
        <Part name={props.course.parts[1].name} exercises={props.course.parts[1].exercises} />
        <Part name={props.course.parts[2].name} exercises={props.course.parts[2].exercises} />
      </div>
    )
}

const Total = (props) => {
    return (
      <div>
        <p>
          yhteensä {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}  tehtävää
        </p>
      </div>
    )
}

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))