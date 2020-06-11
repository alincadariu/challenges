import {
    TetriminoType,
    TETRIMINO_TYPE_COUNT,
    TETRIMINO_MATRIX_MAP,
    TETRIMIN_COLOR_MAP,
} from './TetriminoType';

export class Tetrimino {
    public get name() {
        return TetriminoType[this._type];
    }

    public shape: number[][];
    public color: string;

    public width: number;
    public height: number;

    public x = 0;
    public y = 0;

    constructor(private _type?: TetriminoType) {
        this._type = this._type ??
            Math.floor(Math.random() * TETRIMINO_TYPE_COUNT) + 1;

        this.shape = TETRIMINO_MATRIX_MAP[this._type];
        this.color = TETRIMIN_COLOR_MAP[this._type];
        this.height = this.shape.length;
        this.width = this.shape[0].length;
    }

    public left() {
        this.x -= 1;
    }

    public down() {
        this.y += 1;
    }

    public right() {
        this.x += 1;
    }

    public rotate() {
        const theta = this.shape.reduce((omega, alpha) => omega.concat(alpha));

        let delta = [];
        const [line] = this.shape;
        const lineCount = line.length;

        for (let x = 0; x < lineCount; x++) {
            delta[x] = [];

            for (let i = x; i < theta.length; i += lineCount) {
                delta[x].push(theta[i]);
            }
            delta[x].reverse();
        }

        this.shape = delta;
        [this.width, this.height] = [this.height, this.width];
    }
}