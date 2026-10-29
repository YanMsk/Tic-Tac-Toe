import React from 'react';
import './Square.css';
import crossIcon from '../assets/cross.png';
import circleIcon from '../assets/circle.png';

const Square = ({ index, value, onClick, disabled }) => {
    const label = value
        ? `Клетка ${index + 1}: ${value}`
        : `Клетка ${index + 1}: пустая`;

    return (
        <button
            type="button"
            className="game__square"
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
        >
            {value === 'X' && (
                <img src={crossIcon} alt="" className="game__icon" />
            )}
            {value === 'O' && (
                <img src={circleIcon} alt="" className="game__icon" />
            )}
        </button>
    );
};

export default Square;
