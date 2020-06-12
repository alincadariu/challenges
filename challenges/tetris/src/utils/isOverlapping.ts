import { Tetrimino } from '../Tetrimino';
import { TetrisBoard } from '../TetrisBoard';
import { matrixForEach } from './matrixForEach';

export const isOverlapping = (tetrimino: Tetrimino, board: TetrisBoard) => {
    let isOverlapping = false;

    matrixForEach(tetrimino.shape, (value, y, x) => {
        if (value === 0 || isOverlapping) { return; }

        const boardY = tetrimino.y + y;
        const boardX = tetrimino.x + x;

        if (!board.state[boardY]) {
            isOverlapping = true;
        }

        isOverlapping = isOverlapping || board.state[boardY][boardX] !== 0;
    });

    return isOverlapping;
}