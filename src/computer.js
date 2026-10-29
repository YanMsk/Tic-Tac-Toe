import { calculateWinner } from './helper';

function getAvailableMoves(board) {
    return board.reduce((moves, cell, index) => {
        if (cell === null) {
            moves.push(index);
        }

        return moves;
    }, []);
}

function findWinningMove(board, mark) {
    for (const index of getAvailableMoves(board)) {
        const nextBoard = [...board];
        nextBoard[index] = mark;

        if (calculateWinner(nextBoard) === mark) {
            return index;
        }
    }

    return null;
}

function getRandomMove(board) {
    const moves = getAvailableMoves(board);

    if (moves.length === 0) {
        return null;
    }

    return moves[Math.floor(Math.random() * moves.length)];
}

function getMediumMove(board, computerMark) {
    const humanMark = computerMark === 'X' ? 'O' : 'X';

    // Если компьютер может выиграть — выигрывает.
    const winningMove = findWinningMove(board, computerMark);

    if (winningMove !== null) {
        return winningMove;
    }

    // Если игрок может выиграть — блокирует его.
    const blockingMove = findWinningMove(board, humanMark);

    if (blockingMove !== null) {
        return blockingMove;
    }

    // Предпочитает центральную клетку.
    if (board[4] === null) {
        return 4;
    }

    // Затем выбирает свободный угол.
    const corners = [0, 2, 6, 8].filter((index) => board[index] === null);

    if (corners.length > 0) {
        return corners[Math.floor(Math.random() * corners.length)];
    }

    // Если углов нет, выбирает свободную боковую клетку.
    const edges = [1, 3, 5, 7].filter((index) => board[index] === null);

    if (edges.length > 0) {
        return edges[Math.floor(Math.random() * edges.length)];
    }

    return null;
}

function minimax(board, isMaximizing, computerMark, humanMark, depth = 0) {
    const winner = calculateWinner(board);

    if (winner === computerMark) {
        return 10 - depth;
    }

    if (winner === humanMark) {
        return depth - 10;
    }

    const moves = getAvailableMoves(board);

    if (moves.length === 0) {
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;

        for (const index of moves) {
            const nextBoard = [...board];
            nextBoard[index] = computerMark;

            const score = minimax(
                nextBoard,
                false,
                computerMark,
                humanMark,
                depth + 1,
            );

            bestScore = Math.max(bestScore, score);
        }

        return bestScore;
    }

    let bestScore = Infinity;

    for (const index of moves) {
        const nextBoard = [...board];
        nextBoard[index] = humanMark;

        const score = minimax(
            nextBoard,
            true,
            computerMark,
            humanMark,
            depth + 1,
        );

        bestScore = Math.min(bestScore, score);
    }

    return bestScore;
}

function getHardMove(board, computerMark) {
    const humanMark = computerMark === 'X' ? 'O' : 'X';
    const moves = getAvailableMoves(board);

    if (moves.length === 0) {
        return null;
    }

    let bestScore = -Infinity;
    let bestMoves = [];

    for (const index of moves) {
        const nextBoard = [...board];
        nextBoard[index] = computerMark;

        const score = minimax(nextBoard, false, computerMark, humanMark, 1);

        if (score > bestScore) {
            bestScore = score;
            bestMoves = [index];
        } else if (score === bestScore) {
            bestMoves.push(index);
        }
    }

    // Среди одинаково хороших ходов выбирает случайный.
    return bestMoves[Math.floor(Math.random() * bestMoves.length)];
}

export function getComputerMove(board, difficulty, computerMark) {
    if (difficulty === 'easy') {
        return getRandomMove(board);
    }

    if (difficulty === 'medium') {
        return getMediumMove(board, computerMark);
    }

    return getHardMove(board, computerMark);
}
