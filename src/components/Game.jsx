import { useEffect, useState } from 'react';
import './Game.css';
import Board from './Board';
import { calculateWinner } from '../helper';
import { getComputerMove } from '../computer';

const createEmptyBoard = () => Array(9).fill(null);
const createInitialHistory = () => [{ squares: createEmptyBoard() }];

function Game() {
    const [history, setHistory] = useState(createInitialHistory);
    const [stepNumber, setStepNumber] = useState(0);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [mode, setMode] = useState('local');
    const [difficulty, setDifficulty] = useState('hard');
    const [humanMark, setHumanMark] = useState('X');

    const current = history[stepNumber];
    const currentBoard = current.squares;

    const winner = calculateWinner(currentBoard);
    const isDraw = !winner && currentBoard.every(Boolean);

    const xIsNext = stepNumber % 2 === 0;
    const nextMark = xIsNext ? 'X' : 'O';
    const computerMark = humanMark === 'X' ? 'O' : 'X';

    const isViewingHistory = stepNumber < history.length - 1;

    const isComputerTurn =
        mode === 'computer' && !winner && !isDraw && nextMark === computerMark;

    const resetGame = () => {
        setHistory(createInitialHistory());
        setStepNumber(0);
    };

    const handleClick = (index) => {
        if (isViewingHistory) return;
        if (winner || isDraw || currentBoard[index] !== null) return;
        if (isComputerTurn) return;

        const nextBoard = [...currentBoard];
        nextBoard[index] = nextMark;

        const nextHistory = [
            ...history.slice(0, stepNumber + 1),
            { squares: nextBoard },
        ];

        setHistory(nextHistory);
        setStepNumber(nextHistory.length - 1);
    };

    const jumpTo = (step) => {
        setStepNumber(step);
    };

    const handleModeChange = (event) => {
        setMode(event.target.value);
        resetGame();
    };

    const handleDifficultyChange = (event) => {
        setDifficulty(event.target.value);
    };

    const handleHumanMarkChange = (event) => {
        setHumanMark(event.target.value);
        resetGame();
    };

    useEffect(() => {
        if (!isComputerTurn || isViewingHistory) return undefined;

        const timer = setTimeout(() => {
            const move = getComputerMove(
                currentBoard,
                difficulty,
                computerMark,
            );

            if (move === null) return;

            const nextBoard = [...currentBoard];
            nextBoard[move] = computerMark;

            setHistory((previousHistory) => {
                if (previousHistory.length !== stepNumber + 1) {
                    return previousHistory;
                }

                return [...previousHistory, { squares: nextBoard }];
            });

            setStepNumber((previousStep) => {
                if (previousStep !== stepNumber) return previousStep;
                return previousStep + 1;
            });
        }, 350);

        return () => clearTimeout(timer);
    }, [
        isComputerTurn,
        isViewingHistory,
        currentBoard,
        difficulty,
        computerMark,
        stepNumber,
    ]);

    let status;

    if (isViewingHistory) {
        status =
            stepNumber === 0
                ? 'Начало игры — пустое поле'
                : `Просмотр истории — ход ${stepNumber}`;
    } else if (winner) {
        status = `Победитель: ${winner}`;
    } else if (isDraw) {
        status = 'Ничья!';
    } else if (mode === 'computer') {
        status = isComputerTurn
            ? `Компьютер думает... (${computerMark})`
            : `Твой ход (${humanMark})`;
    } else {
        status = `Следующий ход: ${nextMark}`;
    }

    return (
        <div className={`game ${isDarkTheme ? 'game--dark' : 'game--light'}`}>
            <header className="game__header">
                <h1 className="game__title">Крестики-нолики</h1>

                <div className="game__header-actions">
                    <button
                        className="game__button"
                        type="button"
                        onClick={resetGame}
                    >
                        Новая игра
                    </button>

                    <button
                        className="game__button"
                        type="button"
                        onClick={() => setIsDarkTheme((theme) => !theme)}
                        aria-label={
                            isDarkTheme
                                ? 'Включить светлую тему'
                                : 'Включить тёмную тему'
                        }
                    >
                        {isDarkTheme ? '☀️' : '🌙'}
                    </button>
                </div>
            </header>

            <section className="game__controls" aria-label="Настройки игры">
                <label className="game__control">
                    <span className="game__control-label">Режим игры</span>

                    <select
                        className="game__select"
                        value={mode}
                        onChange={handleModeChange}
                    >
                        <option value="local">Игра вдвоём</option>
                        <option value="computer">Против компьютера</option>
                    </select>
                </label>

                {mode === 'computer' && (
                    <>
                        <label className="game__control">
                            <span className="game__control-label">
                                Сложность
                            </span>

                            <select
                                className="game__select"
                                value={difficulty}
                                onChange={handleDifficultyChange}
                            >
                                <option value="easy">Лёгкая</option>
                                <option value="medium">Средняя</option>
                                <option value="hard">Сложная</option>
                            </select>
                        </label>

                        <label className="game__control">
                            <span className="game__control-label">
                                Твоя сторона
                            </span>

                            <select
                                className="game__select"
                                value={humanMark}
                                onChange={handleHumanMarkChange}
                            >
                                <option value="X">Крестики (X)</option>
                                <option value="O">Нолики (O)</option>
                            </select>
                        </label>
                    </>
                )}
            </section>

            <main className="game__content">
                <div className="game__status" aria-live="polite">
                    {status}
                </div>

                <Board squares={currentBoard} click={handleClick} />

                <section className="game__history">
                    <h2 className="game__history-title">История ходов</h2>

                    <ol className="game__history-list">
                        {history.map((_, move) => (
                            <li key={move} className="game__history-item">
                                <button
                                    className="game__history-button"
                                    type="button"
                                    onClick={() => jumpTo(move)}
                                    disabled={move === stepNumber}
                                >
                                    {move === 0 ? 'Начало игры' : `Ход ${move}`}

                                    {move === stepNumber ? ' — текущий' : ''}
                                </button>
                            </li>
                        ))}
                    </ol>
                </section>
            </main>
        </div>
    );
}

export default Game;
