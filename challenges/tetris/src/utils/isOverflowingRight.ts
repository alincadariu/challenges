import { Tetrimino } from '../Tetrimino';
import { TetrisBoard } from '../TetrisBoard';

export const isOverflowingRight = (tetrimino: Tetrimino, board: TetrisBoard) => {
    return tetrimino.x + tetrimino.width > board.width;
}