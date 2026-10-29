import React, { useState } from 'react';
import './Game.css';
import Board from './Board';
import { calculateWinner } from '../helper';

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    const currentBoard = history[stepNumber];
    const winner = calculateWinner(currentBoard);
    const isDraw = !winner && currentBoard.every((square) => square !== null);

    const handleClick = (index) => {
        const historyPoint = history.slice(0, stepNumber + 1);
        const current = historyPoint[historyPoint.length - 1];
        const boardCopy = [...current];

        if (winner || boardCopy[index]) return;

        boardCopy[index] = xIsNext ? 'X' : 'O';

        setHistory([...historyPoint, boardCopy]);
        setStepNumber(historyPoint.length);
        setXIsNext(!xIsNext);
    };

    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    };

    const handleReset = () => {
        setHistory([Array(9).fill(null)]);
        setStepNumber(0);
        setXIsNext(true);
    };

    let statusClass = 'game__status';
    if (winner === 'X' || (!winner && !isDraw && xIsNext)) {
        statusClass += ' game__status--x';
    } else if (winner === 'O' || (!winner && !isDraw && !xIsNext)) {
        statusClass += ' game__status--o';
    } else if (isDraw) {
        statusClass += ' game__status--draw';
    }

    return (
        <div className={`game ${isDarkTheme ? 'theme--dark' : 'theme--light'}`}>
            <h1 className="game__title">Tic-Tac-Toe</h1>

            <div className="game__header">
                <button
                    className="game__btn game__btn--reset"
                    onClick={handleReset}
                >
                    Clean board
                </button>
                <button
                    className="game__theme-toggle"
                    onClick={() => setIsDarkTheme(!isDarkTheme)}
                    title="Toggle Theme"
                >
                    {isDarkTheme ? '☀️ Light' : '🌙 Dark'}
                </button>
            </div>

            <div className="game__container">
                <div className="game__play-zone">
                    <Board squares={currentBoard} click={handleClick} />
                    <p className={statusClass}>
                        {winner
                            ? `Winner: ${winner}`
                            : isDraw
                              ? "It's a draw!"
                              : `Next player: ${xIsNext ? 'X' : 'O'}`}
                    </p>
                </div>

                <div className="game__history">
                    <h3 className="game__history-title">Match History</h3>
                    <ul className="game__history-list">
                        {history.map((_step, move) => {
                            const destination = move
                                ? `Go to move #${move}`
                                : 'Go to game start';
                            const isCurrent = move === stepNumber;

                            return (
                                <li key={move} className="game__history-item">
                                    <button
                                        className={`game__btn game__btn--history ${isCurrent ? 'game__btn--current-step' : ''}`}
                                        onClick={() => jumpTo(move)}
                                    >
                                        {destination}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Game;
