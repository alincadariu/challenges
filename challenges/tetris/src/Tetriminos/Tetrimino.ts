import { TETRIMINOS, CELL_SIZE, PADDING } from '../Constants';

export class Tetrimino {

    public shape: number[][];
    public x: number;
    public y: number;
    private _id: number;

    constructor() {
        this._id = Math.floor(Math.random() * 7);
        this.shape = TETRIMINOS[this._id];
        this.x = 0;
        this.y = 0;
    }

    public get id() {
        return this._id;
    }

    public moveLeft() {
        this.x -= 1;
    }

    public moveRight() {
        this.x += 1;
    }

    public rotate() {
        for (let y = 0; y < this.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [this.shape[x][y], this.shape[y][x]] = [this.shape[y][x], this.shape[x][y]];
            }
        }
        this.shape.forEach(row => row.reverse());
    }

}