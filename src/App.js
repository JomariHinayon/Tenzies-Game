import './App.css';
import Die from './component/Die'
import {React, useState, useEffect} from 'react'
import {nanoid} from 'nanoid'
import Timer from './component/Timer'


function App() {

  const [diceNumbers, setDiceNumbers] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rollTaken, setRollTaken] = useState(0)
  const [timer, setTimer] = useState('00:00:30');
  const [restart,setRestart] = useState(false)
  const [button, setButton] = useState("Roll")


  useEffect(
    () => {
      const allHeld = diceNumbers.every( die => die.isHeld)
      const firstValue = diceNumbers[0].value
      const allSameValue = diceNumbers.every(die => die.value === firstValue)

      if(allHeld && allSameValue) {
        setTenzies(true)
        setButton('New Game')
      }

    },[diceNumbers]
  )

  function generateNewDie() {
    return {
      value : Math.ceil(Math.random() * 6),
      isHeld : false,
      id : nanoid()
    }
  }

function allNewDice() {
  const newDice = []
  for(let i = 0; i < 10; i++) {
    newDice.push(generateNewDie())
  }
  return newDice
}

console.log()

function holdDice( id) {
  setDiceNumbers( oldDice => oldDice.map(
    die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }
  ))
}

const diceElements = diceNumbers.map( 
  die => <Die key={die.id} 
  value={die.value} 
  isHeld={die.isHeld} 
  id={die.id} 
  holdDice={ () => holdDice(die.id)}
  />
  )

function rollDice(id) {
  
  if(!tenzies ) {
    setDiceNumbers( oldDice => oldDice.map(
      die => {
        return die.isHeld ? 
          die : generateNewDie()
      }
    ))
    setRollTaken(rollTaken + 1)

  }else {
    setTenzies(false)
    setDiceNumbers(allNewDice())
    setRollTaken(0)
    setRestart(false)
    setButton("Roll")
  }
}



  return (
    <main>
      <h1>Tenzies Game</h1>
      <p>Click the numbers that are the same and roll until all dices are the same.</p>
      <h2 >Number of Rolls: {rollTaken}</h2>
      <h2><Timer 
      timer={timer} 
      setTimer={setTimer} 
      tenzies={tenzies} 
      setTenzies ={setTenzies}
      restart={restart}
      setRestart={setRestart}
      button = {button}
      setButton ={setButton}

      />
      </h2>
      <div className='die-container'>
        {diceElements}
      </div>
      <button 
        className='roll-button' 
        onClick={rollDice}>
        {button}
        </button>
    </main>
  );
}

export default App;
