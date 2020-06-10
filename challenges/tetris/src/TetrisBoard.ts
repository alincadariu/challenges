import { Tetrimino } from './Tetrimino';
import { TetriminoType } from './TetriminoType';
import { matrixForEach } from './utils';

export class TetrisBoard {
    public state: number[][] = [];

    public get isGameOver() {
        for (let x = 0; x < this.width; x++) {
            if (this.state[0][x] !== 0) { return true; }
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
            this.state.push(line);
        }
    }

    public isReadyToAdd(tetrimino: Tetrimino) {
        let isReady = false;
        matrixForEach(tetrimino.shape, (value, valueY, valueX) => {
            const y = tetrimino.y + valueY;
            const x = tetrimino.x + valueX;

            const lineBelow = this.state[y + 1];

            if (!lineBelow) { return isReady = true; }

            if (value !== 0 && lineBelow[x] !== 0) { return isReady = true; }
        });

        return isReady;
    }

    public addTetrimino(tetrimino: Tetrimino) {
        tetrimino.shape.forEach((line, y) => {
            line.forEach((column, x) => {
                if (column === 0) { return; }

                this.state[y + tetrimino.y][x + tetrimino.x] = TetriminoType[tetrimino.name];
            });
        });
    }
}