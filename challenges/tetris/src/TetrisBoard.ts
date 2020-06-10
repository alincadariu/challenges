import { Tetrimino } from './Tetrimino';
import { TetriminoType } from './TetriminoType';

export class TetrisBoard {
    public board: number[][] = [];

    public get isOverlowing() {
        for (let x = 0; x < this.width; x++) {
            if (this.board[0][x] !== 0) { return true; }
        }

        return false;
    }

    constructor(
        public readonly width: number,
        public readonly height: number,
    ) {
        for (let y = 0; y < this.height; y++) {
            const line = [];
            for (let x = 0; x < this.width; x++) {
                line.push(0);
            }
            this.board.push(line);
        }
    }

    public addTetrimino(tetrimino: Tetrimino) {
        tetrimino.shape.forEach((line, y) => {
            line.forEach((column, x) => {
                if (column === 0) { return; }

                this.board[y + tetrimino.y][x + tetrimino.x] = TetriminoType[tetrimino.name];
            });
        });
    }
}