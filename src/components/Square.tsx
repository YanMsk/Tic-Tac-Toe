import './Square.css';
import cross from '../assets/cross.png';
import circle from '../assets/circle.png';
import { Mark } from '../helper';

interface SquareProps {
    value: Mark | null;
    onClick: () => void;
}

function Square({ value, onClick }: SquareProps) {
    return (
        <button
            className="game__square"
            type="button"
            onClick={onClick}
            aria-label={value ? `Клетка: ${value}` : 'Пустая клетка'}
        >
            {value === 'X' && <img src={cross} alt="Крестик" />}
            {value === 'O' && <img src={circle} alt="Нолик" />}
        </button>
    );
}

export default Square;
