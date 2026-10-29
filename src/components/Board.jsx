import Square from './Square';
import './Board.css';

function Board({ squares, click }) {
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
