import { useState, useEffect } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"

function App() {
const [numButtons, setNumButtons] = useState(window.innerWidth <= 600 ? 12 : 10);
const [diceObj, setDiceObj] = useState(() => generateAllNewDice(numButtons))
const gameWon = diceObj.every(die => die.isHeld) && diceObj.every(die => die.value === diceObj[0].value)


  useEffect(() => {
    function updateButtonCount() {
      const newCount = window.innerWidth <= 600 ? 12 : 10;
      setNumButtons(newCount);
      setDice(generateAllNewDice(newCount)); // Regenerate dice when count changes
    }

    window.addEventListener("resize", updateButtonCount);
    return () => window.removeEventListener("resize", updateButtonCount);
  }, []);

  function generateAllNewDice(count) {
    return Array.from({ length: count }, () => ({
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    }));
  }

function hold(id) {
   setDiceObj(prev => prev.map(dice => {
    return dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
}))
}


const diceElement = diceObj.map(dieObj => {
   
   return <Die key={dieObj.id} isheld={dieObj.isHeld} onclick={() => {hold(dieObj.id); rollDice;}} value={dieObj.value} keyId={dieObj.id} />
})

function rollDice() {
  if (!gameWon) {
    setDiceObj(prevObj =>
      prevObj.map(dice => {
        const randomNum = Math.floor(Math.random() * 6) + 1;
        return dice.isHeld ? dice : { ...dice, value: randomNum };
      })
    );
  } else {
    setDiceObj(generateAllNewDice());
  }
}


return (
    <>
	<main>
		{gameWon && <Confetti />}	  
		<div aria-live="polite" className="sr-only">
		   {gameWon && <p>Congratulations!, You Won! "New Game" to start again</p>}
		</div>
		<h1 className="title">Tenzies</h1>
		<p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
	 
	    <div className="dice-container">
		{diceElement}
	    </div>
		<button className="roll-dice" onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
	</main>
	
    </>
  )
}

export default App
