import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
);

const Feedback = ({good, neutral, bad}) => (
  <></>
);

const Print = ({type, count}) => (
  <p>{type} {count}</p>
);

<<<<<<< HEAD
const Statistics = ({neutral, good, bad}) => {
  total = neutral + good + bad;
  console.log(total)

  if (total <= 0){
    return(<p>No feedback given</p>)
  }
  return(
  <div>
      <p>total {total}</p>
      <p>average {(good+(bad*-1))/(total)}</p>
      <p>positive {good*(100/(total))} %</p>
  </div>
  );
};

=======
>>>>>>> parent of 375979c... exercise 1.7

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

    </div>
  )
}

export default App