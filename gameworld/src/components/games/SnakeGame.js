import React, { useState, useEffect } from 'react';
import { FiArrowUp, FiArrowDown, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { FaApple } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';

const BOX_SIZE = 20; // in pixels
const BOX_ROWS = 20;
const BOX_COLS = 20;
const INITIAL_GAME_SPEED = 300; // in milliseconds
const FOOD_SCORE = 10;

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ row: 10, col: 10 }]);
  const [direction, setDirection] = useState('right');
  const [food, setFood] = useState({ row: 5, col: 5 }); // Initial food position
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(INITIAL_GAME_SPEED);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    generateFood();

    if (gameStarted && !gameOver) {
      const interval = setInterval(moveSnake, gameSpeed);
      return () => clearInterval(interval);
    }
  }, [snake, gameStarted, gameOver, gameSpeed]);

  const handleKeyDown = (event) => {
    if (!gameStarted) return;

    if (event.keyCode === 37 && direction !== 'right') {
      setDirection('left');
    } else if (event.keyCode === 38 && direction !== 'down') {
      setDirection('up');
    } else if (event.keyCode === 39 && direction !== 'left') {
      setDirection('right');
    } else if (event.keyCode === 40 && direction !== 'up') {
      setDirection('down');
    }
  };

  const startGame = () => {
    setSnake([{ row: 10, col: 10 }]);
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setGameSpeed(INITIAL_GAME_SPEED);
  };

  const generateFood = () => {
    setFood({ row: 5, col: 5 });
  };

  const checkCollision = (head) => {
    if (
      head.row < 0 ||
      head.row >= BOX_ROWS ||
      head.col < 0 ||
      head.col >= BOX_COLS ||
      snake.some((segment) => segment.row === head.row && segment.col === head.col)
    ) {
      setGameOver(true);
      setGameStarted(false);
    }
  };

  const moveSnake = () => {
    if (!gameStarted || gameOver) return;

    const head = { ...snake[0] };

    if (direction === 'up') {
      head.row--;
    } else if (direction === 'down') {
      head.row++;
    } else if (direction === 'left') {
      head.col--;
    } else if (direction === 'right') {
      head.col++;
    }

    checkCollision(head);

    const newSnake = [head, ...snake];

    if (head.row === food.row && head.col === food.col) {
      generateFood();
      setScore((prevScore) => prevScore + FOOD_SCORE);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const renderCells = () => {
    const cells = [];

    for (let row = 0; row < BOX_ROWS; row++) {
      for (let col = 0; col < BOX_COLS; col++) {
        const isSnakeSegment = snake.some((segment) => segment.row === row && segment.col === col);
        const isFood = food.row === row && food.col === col;

        const cellStyle = {
          left: `${col * BOX_SIZE}px`,
          top: `${row * BOX_SIZE}px`,
          width: `${BOX_SIZE}px`,
          height: `${BOX_SIZE}px`,
        };

        const cellClassName = `absolute ${isSnakeSegment ? 'bg-green-500' : ''}`;

        cells.push(
          <div key={`${row}-${col}`} className={cellClassName} style={cellStyle}>
            {isFood && <FaApple className="text-red-500 text-2xl" />}
            {isSnakeSegment && !isFood && (
              <IoIosArrowForward className={`text-green-500 text-2xl transform rotate-${getSnakeHeadRotation()}`} />
            )}
          </div>
        );
      }
    }

    return cells;
  };

  const getSnakeHeadRotation = () => {
    switch (direction) {
      case 'up':
        return '270';
      case 'down':
        return '90';
      case 'left':
        return '180';
      case 'right':
      default:
        return '0';
    }
  };

  return (
    <div className="flex flex-col items-center h-screen mt-5">
      <div
        className="relative border border-gray-400 mb-4 bg-lime-300"
        style={{ width: `${BOX_COLS * BOX_SIZE}px`, height: `${BOX_ROWS * BOX_SIZE}px` }}
      >
        {renderCells()}
      </div>
      {gameOver && (
        <div className="text-4xl text-white bg-gray-900 bg-opacity-50 p-4 rounded">Game Over</div>
      )}
      {!gameStarted && (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          onClick={startGame}
        >
          Start
        </button>
      )}
      <div className="flex">
        <button
            className={`flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 ${
            !gameStarted ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => setDirection('left')}
            disabled={!gameStarted}
        >
            <FiArrowLeft className="text-xl" />
        </button>

        <div className="flex flex-col">
            <button
            className={`flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 ${
                !gameStarted ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => setDirection('up')}
            disabled={!gameStarted}
            >
            <FiArrowUp className="text-xl" />
            </button>
            <button
            className={`flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                !gameStarted ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => setDirection('down')}
            disabled={!gameStarted}
            >
            <FiArrowDown className="text-xl" />
            </button>
        </div>

  

  <button
    className={`flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2 ${
      !gameStarted ? 'opacity-50 cursor-not-allowed' : ''
    }`}
    onClick={() => setDirection('right')}
    disabled={!gameStarted}
  >
    <FiArrowRight className="text-xl" />
  </button>
</div>

      <div className="text-2xl font-bold mt-4">Score: {score}</div>
    </div>
  );
};

export default SnakeGame;
