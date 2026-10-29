import React from 'react';
import './Square.css';
import crossIcon from '../assets/cross.png';
import circleIcon from '../assets/circle.png';

const Square = ({ value, onClick }) => {
    return (
        <button className="game__square" onClick={onClick}>
            {value === 'X' && (
                <img src={crossIcon} alt="X" className="game__icon" />
            )}
            {value === 'O' && (
                <img src={circleIcon} alt="O" className="game__icon" />
            )}
        </button>
    );
};

export default Square;
