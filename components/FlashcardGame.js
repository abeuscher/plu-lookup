'use client';

import React, { useEffect, useState } from 'react';

import { products } from '../data/products';

function FlashcardGame() {
  const [selectedPLUs, setSelectedPLUs] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameItems, setGameItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pluOptions, setPluOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [userInputs, setUserInputs] = useState({});

  // Initialize PLU options from products data
  useEffect(() => {
    setPluOptions(products);
  }, []);

  // Handle PLU selection
  const handlePLUSelection = (plu) => {
    setSelectedPLUs((prev) =>
      prev.includes(plu) ? prev.filter((item) => item !== plu) : [...prev, plu]
    );
  };

  // Start the game
  const startGame = () => {
    const selectedItems = products.filter((product) =>
      selectedPLUs.includes(product.plu)
    );
    setGameItems(shuffleArray(selectedItems));
    setGameStarted(true);
    setCurrentIndex(0);
    setScore(0);
    setCurrentRound(1);
  };

  // Shuffle array helper function
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // Handle PLU block click during the first round
  const handlePLUClickRound1 = (plu) => {
    const currentItem = gameItems[currentIndex];
    if (plu === currentItem.plu) {
      setScore((prevScore) => prevScore + 1);
    } else {
      setScore((prevScore) => prevScore - 1);
      // Optionally, highlight the correct PLU here
    }
    // Remove the selected PLU block
    setGameItems((prev) => prev.filter((item) => item.plu !== plu));
    // Move to the next item
    setCurrentIndex(currentIndex + 1);
  };

  // Handle name block click during the second round
  const handleNameClickRound2 = (fullname) => {
    const currentItem = gameItems[currentIndex];
    if (fullname === currentItem.fullname) {
      setScore((prevScore) => prevScore + 1);
    } else {
      setScore((prevScore) => prevScore - 1);
      // Optionally, highlight the correct name here
    }
    // Remove the selected name block
    setGameItems((prev) => prev.filter((item) => item.fullname !== fullname));
    // Move to the next item
    setCurrentIndex(currentIndex + 1);
  };

  // Handle input change in the final round
  const handleInputChange = (id, value) => {
    setUserInputs((prevInputs) => ({
      ...prevInputs,
      [id]: value,
    }));
  };

  // Calculate final score for the last round
  const calculateFinalScore = () => {
    let finalScore = score;
    gameItems.forEach((item) => {
      if (userInputs[item.id] === item.plu) {
        finalScore += 1;
      } else {
        finalScore -= 1;
      }
    });
    setScore(finalScore);
    setCurrentRound(4); // Indicate that the game is over
  };

  if (!gameStarted) {
    // Selection screen
    return (
      <div>
        <h1>Select PLUs to be quizzed on</h1>
        <ul>
          {pluOptions.map((product) => (
            <li key={product.plu}>
              <input
                type="checkbox"
                checked={selectedPLUs.includes(product.plu)}
                onChange={() => handlePLUSelection(product.plu)}
              />
              {product.plu} - {product.fullname}
            </li>
          ))}
        </ul>
        <button onClick={startGame} disabled={selectedPLUs.length === 0}>
          Start Game
        </button>
      </div>
    );
  } else if (currentRound === 1) {
    // First Round
    const currentItem = gameItems[currentIndex];

    // If all items have been quizzed
    if (!currentItem) {
      // Proceed to the second round
      setGameItems(shuffleArray(products.filter((product) => selectedPLUs.includes(product.plu))));
      setCurrentIndex(0);
      setCurrentRound(2);
      return null;
    }

    return (
      <div>
        <h1>Round 1: Match the PLU to the Item Name</h1>
        <p>Score: {score}</p>
        <h2>{currentItem.fullname}</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {gameItems.map((item) => (
            <button
              key={item.plu}
              onClick={() => handlePLUClickRound1(item.plu)}
              style={{
                width: '100px',
                height: '100px',
                margin: '10px',
                fontSize: '20px',
              }}
            >
              {item.plu}
            </button>
          ))}
        </div>
      </div>
    );
  } else if (currentRound === 2) {
    // Second Round
    const currentItem = gameItems[currentIndex];

    // If all items have been quizzed
    if (!currentItem) {
      // Proceed to the final round
      setGameItems(products.filter((product) => selectedPLUs.includes(product.plu)));
      setCurrentRound(3);
      return null;
    }

    return (
      <div>
        <h1>Round 2: Match the Item Name to the PLU</h1>
        <p>Score: {score}</p>
        <h2>{currentItem.plu}</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {gameItems.map((item) => (
            <button
              key={item.fullname}
              onClick={() => handleNameClickRound2(item.fullname)}
              style={{
                width: '150px',
                height: '100px',
                margin: '10px',
                fontSize: '16px',
              }}
            >
              {item.fullname}
            </button>
          ))}
        </div>
      </div>
    );
  } else if (currentRound === 3) {
    // Final Round
    return (
      <div>
        <h1>Final Round: Type the PLU Numbers</h1>
        <p>Score: {score}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            calculateFinalScore();
          }}
        >
          {gameItems.map((item) => (
            <div key={item.id} style={{ marginBottom: '10px' }}>
              <label>
                {item.fullname}:
                <input
                  type="text"
                  value={userInputs[item.id] || ''}
                  onChange={(e) => handleInputChange(item.id, e.target.value)}
                  style={{ marginLeft: '10px' }}
                />
              </label>
            </div>
          ))}
          <button type="submit">Submit Answers</button>
        </form>
      </div>
    );
  } else {
    // Game Over Screen
    return (
      <div>
        <h1>Game Over</h1>
        <p>Your final score is: {score}</p>
        <button
          onClick={() => {
            setGameStarted(false);
            setSelectedPLUs([]);
            setUserInputs({});
            setScore(0);
            setCurrentRound(1);
          }}
        >
          Play Again
        </button>
      </div>
    );
  }
}

export default FlashcardGame;
