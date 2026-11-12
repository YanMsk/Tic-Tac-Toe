export type Mark = 'X' | 'O';
export type SquareValue = Mark | null;
export type Board = SquareValue[];

const winningLines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

export function calculateWinner(squares: Board): Mark | null {
    for (const [a, b, c] of winningLines) {
        const mark = squares[a];

        if (mark && mark === squares[b] && mark === squares[c]) {
            return mark;
        }
    }

    return null;
}
