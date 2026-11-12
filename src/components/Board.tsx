import Square from './Square';
import './Board.css';
import { Board as BoardState } from '../helper';

interface BoardProps {
    squares: BoardState;
    click: (index: number) => void;
}

function Board({ squares, click }: BoardProps) {
    return (
        <div className="game__board">
            {squares.map((square, index) => (
                <Square
                    key={index}
                    value={square}
                    onClick={() => click(index)}
                />
            ))}
        </div>
    );
}

export default Board;
