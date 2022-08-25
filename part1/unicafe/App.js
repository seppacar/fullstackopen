import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
);


const Print = ({type, count}) => (
  <p>{type} {count}</p>
);

const Statistics = ({neutral, good, bad}) => (
  <div>
      <p>total {neutral + good + bad}</p>
      <p>average {(good+(bad*-1))/(neutral + good + bad)}</p>
      <p>positive {good*(100/(neutral+good+bad))} %</p>
  </div>
);


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
    <h1>statistics</h1>
    <Print type="good" count={good}/>
    <Print type="neutral" count={neutral}/>
    <Print type="bad" count={bad}/>
    <Statistics good={good} bad={bad} neutral={neutral}/>

    </div>
  )
}

export default App