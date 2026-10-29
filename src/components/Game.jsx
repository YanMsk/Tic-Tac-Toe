import React, { useState } from 'react';
import './Game.css';
import Board from './Board';
import { calculateWinner } from '../helper';

const createEmptyBoard = () => Array(9).fill(null);

const Game = () => {
    const [history, setHistory] = useState([createEmptyBoard()]);
    const [stepNumber, setStepNumber] = useState(0);
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    const currentBoard = history[stepNumber];
    const xIsNext = stepNumber % 2 === 0;
    const winner = calculateWinner(currentBoard);
    const isDraw = !winner && currentBoard.every((square) => square !== null);

    const handleClick = (index) => {
        if (winner || currentBoard[index]) return;

        const historyPoint = history.slice(0, stepNumber + 1);
        const boardCopy = [...currentBoard];

        boardCopy[index] = xIsNext ? 'X' : 'O';

        setHistory([...historyPoint, boardCopy]);
        setStepNumber(historyPoint.length);
    };

    const jumpTo = (step) => {
        setStepNumber(step);
    };

    const handleReset = () => {
        setHistory([createEmptyBoard()]);
        setStepNumber(0);
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
        <main
            className={`game ${isDarkTheme ? 'theme--dark' : 'theme--light'}`}
        >
            <h1 className="game__title">Tic-Tac-Toe</h1>

            <div className="game__header">
                <button
                    type="button"
                    className="game__btn game__btn--reset"
                    onClick={handleReset}
                >
                    New game
                </button>

                <button
                    type="button"
                    className="game__theme-toggle"
                    onClick={() => setIsDarkTheme((current) => !current)}
                    title="Переключить тему"
                    aria-label={`Включить ${isDarkTheme ? 'светлую' : 'тёмную'} тему`}
                    aria-pressed={!isDarkTheme}
                >
                    {isDarkTheme ? '☀️ Light' : '🌙 Dark'}
                </button>
            </div>

            <div className="game__container">
                <section
                    className="game__play-zone"
                    aria-label="Игра в крестики-нолики"
                >
                    <Board
                        squares={currentBoard}
                        click={handleClick}
                        winner={winner}
                    />

                    <p
                        className={statusClass}
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {winner
                            ? `Winner: ${winner}`
                            : isDraw
                              ? "It's a draw!"
                              : `Next player: ${xIsNext ? 'X' : 'O'}`}
                    </p>
                </section>

                <aside className="game__history">
                    <h2 className="game__history-title">Match History</h2>
                    <ol className="game__history-list">
                        {history.map((_step, move) => {
                            const destination = move
                                ? `Go to move #${move}`
                                : 'Go to game start';
                            const isCurrent = move === stepNumber;

                            return (
                                <li key={move} className="game__history-item">
                                    <button
                                        type="button"
                                        className={`game__btn game__btn--history ${isCurrent ? 'game__btn--current-step' : ''}`}
                                        onClick={() => jumpTo(move)}
                                        aria-current={
                                            isCurrent ? 'step' : undefined
                                        }
                                    >
                                        {destination}
                                    </button>
                                </li>
                            );
                        })}
                    </ol>
                </aside>
            </div>
        </main>
    );
};

export default Game;
