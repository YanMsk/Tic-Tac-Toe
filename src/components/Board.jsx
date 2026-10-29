import React from 'react';
import './Board.css';
import Square from './Square';

const Board = ({ squares, click, winner }) => {
    return (
        <div
            className="game__board"
            role="group"
            aria-label="Игровое поле 3 на 3"
        >
            {squares.map((square, index) => (
                <Square
                    key={index}
                    index={index}
                    value={square}
                    onClick={() => click(index)}
                    disabled={Boolean(winner || square)}
                />
            ))}
        </div>
    );
};

export default Board;
