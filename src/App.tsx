import "./styles.scss";
import { useGameStore } from "./state/state";
import { useEffect, useState } from "react";

import DiceComponent from "./components/Dice";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App(): JSX.Element {
  const store = useGameStore((state) => state);
  const [countdown, setCountdown] = useState(10);
  const [diceWon, updateDiceWon] = useState(0);
  const [won, updateWon] = useState(0);
  const [lost, updateLost] = useState(0);
  const [showCalculating, setShowCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [allowBet, setAllowBetting] = useState(false);

  function calculateBalanceAfterBet() {
    let randomDicePick = Math.floor(Math.random() * 6);
    updateDiceWon(randomDicePick);
    let winVal = 0;
    let loseVal = 0;
    store.dices.forEach((dice, index) => {
      if (randomDicePick === index) {
        winVal = 2 * dice.value;
        store.increaseBalance(winVal);
      } else {
        loseVal += dice.value;
      }
    });
    updateWon(winVal);
    updateLost(loseVal);
  }

  function displayResult() {
    setShowCalculating(false);
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
    }, 5000);
  }

  useEffect(() => {
    if (countdown === 0) {
      setAllowBetting(false);
      setShowCalculating(true);
      setTimeout(() => {
        setCountdown(10);
        calculateBalanceAfterBet();
        displayResult();
      }, 2000);
    }
  }, [countdown]);

  function handleBet(diceNumber: number): void {
    if (store.balance > 0) {
      store.increaseBet(1, diceNumber);
    }
  }

  function startGame(): void {
    store.resetDices();
    setAllowBetting(true);
    let timer: any;
    let count: number = 10;
    timer = setInterval(() => {
      if (count < 1) {
        clearInterval(timer);
      }
      if (count > 0) {
        count -= 1;
        setCountdown(count);
      }
    }, 1000);
  }

  function startGameFromReBet(): void {
    // store.resetDices();
    setAllowBetting(true);
    let timer: any;
    let count: number = 10;
    timer = setInterval(() => {
      if (count < 1) {
        clearInterval(timer);
      }
      if (count > 0) {
        count -= 1;
        setCountdown(count);
      }
    }, 1000);
  }

  return (
    <div className="App">
      <Header
        balance={store.balance}
        resetGame={store.resetGame}
        countdown={countdown}
      />
      <div className={`dice-container ${allowBet ? "allowed" : "not-allowed"}`}>
        {store.dices.map((dice, index) => {
          return (
            <DiceComponent dice={dice} index={index} handleBet={handleBet} />
          );
        })}
      </div>
      <div className="scores-container">
        <p>Click on start to place bet.</p>
        {showCalculating && <h6>Calculating...</h6>}
        {showResult && (
          <h3>
            {`Dice ${diceWon} wins`}
            <span className="result-won">{`Result: Won ${won}`}</span>
            <span className="result-lost">{`Lost ${lost}`}</span>
          </h3>
        )}
      </div>

      <Footer
        startGame={startGame}
        countdown={countdown}
        allowBet={allowBet}
        balance={store.balance}
        reBet={startGameFromReBet}
      />
    </div>
  );
}
