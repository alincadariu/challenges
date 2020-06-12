import { Tetrimino } from '../Tetrimino';
import { matrixForEach } from './matrixForEach';
import { TetrisBoard } from '../TetrisBoard';

export const isReadyToMerge = (tetrimino: Tetrimino, board: TetrisBoard) => {
    let isAddable = false;

    matrixForEach(tetrimino.shape, (value, valueY, valueX) => {
        const y = tetrimino.y + valueY;
        const x = tetrimino.x + valueX;

        const lineBelow = board.state[y + 1];

        if (!lineBelow) { return isAddable = true; }

        if (value !== 0 && lineBelow[x] !== 0) { return isAddable = true; }
    });

    return isAddable;
}