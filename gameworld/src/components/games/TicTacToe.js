import React, { useState, useEffect } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const gameWinner = checkWinner();
    if (gameWinner) {
      setWinner(gameWinner);
    }
  }, [board]);

  const checkWinner = () => {
    const winningConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (!board.includes('')) {
      return 'draw';
    }

    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }

    const updatedBoard = [...board];
    updatedBoard[index] = player;
    setBoard(updatedBoard);

    setPlayer(player === 'X' ? 'O' : 'X');
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setPlayer('X');
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center bg-slate-200 h-screen pt-5">
      <h1 className="text-4xl font-bold mb-4">Tic Tac Toe</h1>
      {winner && (
        <div className="text-2xl font-semibold mb-4">
          {winner === 'draw' ? "It's a Draw!" : `Player ${winner} Wins!`}
        </div>
      )}
      <div className="grid grid-cols-3 gap-4 mb-4 p-5 bg-white  shadow-md">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`p-8 bg-white rounded-lg cursor-pointer text-5xl font-bold flex items-center justify-center border-4 ${
              cell === 'X' ? 'text-blue-500 border-blue-500' : 'text-red-500 border-red-500'
            } ${winner ? 'pointer-events-none' : ''}`}
            style={{ width: '100px', height: '100px' }}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={resetGame}
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default TicTacToe;
