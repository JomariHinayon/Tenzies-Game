import './App.css';
import Die from './component/Die'
import {React, useState, useEffect} from 'react'
import {nanoid} from 'nanoid'


function App() {

  const [diceNumbers, setDiceNumbers] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(
    () => {
      const allHeld = diceNumbers.every( die => die.isHeld)
      const firstValue = diceNumbers[0].value
      const allSameValue = diceNumbers.every(die => die.value === firstValue)

      if(allHeld && allSameValue) {
        setTenzies(true)
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

  if(!tenzies) {
    setDiceNumbers( oldDice => oldDice.map(
      die => {
        return die.isHeld ? 
          die : generateNewDie()
      }
    ))
  }else {
    setTenzies(false)
    setDiceNumbers(allNewDice())
  }
  
}


  return (
    <main>
      <h1>Tenzies Game</h1>
      <p>Click the numbers that are the same and roll until all dices are the same.</p>
      <div className='die-container'>
        {diceElements}
      </div>
      <button 
        className='roll-button' 
        onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"
        }
        </button>
    </main>
  );
}

export default App;
