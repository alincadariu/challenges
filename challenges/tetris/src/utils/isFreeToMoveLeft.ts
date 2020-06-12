import { Tetrimino } from '../Tetrimino';
import { TetrisBoard } from '../TetrisBoard';

export const isFreeToMoveLeft = (tetrimino: Tetrimino, board: TetrisBoard) => {
    let isAllowed = true;

    const x = 0;
    for (let y = 0; y < tetrimino.height; y++) {
        if (tetrimino.shape[y][x] === 0) { continue; }

        const boardY = tetrimino.y + y;
        const boardX = tetrimino.x + x - 1;

        isAllowed = isAllowed && board.state[boardY][boardX] === 0;
    }

    return isAllowed;
}