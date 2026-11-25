
import { useState } from 'react'

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [winner, setWinner] = useState(null)

  function checkWinner(updatedBoard) {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination

      if (
        updatedBoard[a] &&
        updatedBoard[a] === updatedBoard[b] &&
        updatedBoard[a] === updatedBoard[c]
      ) {
        return updatedBoard[a]
      }
    }

    return null
  }

  function handleClick(index) {
    if (board[index] || winner) {
      return
    }

    const updatedBoard = [...board]

    updatedBoard[index] = currentPlayer

    setBoard(updatedBoard)

    const gameWinner = checkWinner(updatedBoard)

    if (gameWinner) {
      setWinner(gameWinner)
      return
    }

    if (updatedBoard.every((cell) => cell !== null)) {
      setWinner('Draw')
      return
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
  }

  function restartGame() {
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
    setWinner(null)
  }

  return (
    <main className="min-h-screen bg-[#100f1c] text-white flex items-center justify-center p-4">

      <div className="w-full max-w-md">

        <header className="text-center mb-8">
          <p className="text-purple-400 text-sm tracking-[0.3em]">
            THE CLASSIC GAME
          </p>

          <h1 className="text-5xl font-bold mt-3">
            Tic Tac Toe
          </h1>

          <p className="text-gray-400 mt-3">
            A little strategy. A little fun.
          </p>
        </header>

        <div className="text-center mb-6">
          {winner === 'Draw' ? (
            <p className="text-xl font-semibold text-yellow-300">
              It's a draw!
            </p>
          ) : winner ? (
            <p className="text-xl font-semibold text-purple-300">
              Player {winner} wins!
            </p>
          ) : (
            <p className="text-xl">
              Player{' '}
              <span className={currentPlayer === 'X'
                ? 'text-purple-400'
                : 'text-cyan-400'
              }>
                {currentPlayer}
              </span>
              's turn
            </p>
          )}
        </div>

        <section className="grid grid-cols-3 gap-3 bg-[#1a1829] p-3 rounded-2xl">

          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={Boolean(cell) || Boolean(winner)}
              className={`
                aspect-square rounded-xl
                bg-[#242137]
                border border-[#353149]
                text-5xl font-bold
                transition-all duration-200
                hover:bg-[#302b48]
                disabled:cursor-default
                ${cell === 'X'
                  ? 'text-purple-400'
                  : 'text-cyan-400'
                }
              `}
            >
              {cell}
            </button>
          ))}

        </section>

        <button
          onClick={restartGame}
          className="
            w-full mt-6 p-4 rounded-xl
            bg-purple-400 text-[#171326]
            font-bold text-lg
            hover:bg-purple-300
            transition
          "
        >
          Restart Game
        </button>

        <p className="text-center text-gray-500 text-sm mt-6">
          Made with love and a little competition ♡
        </p>

      </div>

    </main>
  )
}

export default App
