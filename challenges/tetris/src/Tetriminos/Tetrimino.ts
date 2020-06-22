import { TETRIMINOS, CELL_SIZE, PADDING } from '../constants';

export class Tetrimino {

    private _shape: number[][];
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;

    constructor(private _id?: number) {
        this._id = this._id ?? Math.floor(Math.random() * 7);
        this._shape = TETRIMINOS[this._id];
        this._x = 0;
        this._y = 0;
        this._width = this.shape[0].length;
        this._height = this.shape.length;
    }

    public get width() {
        return this._width;
    }

    public get height() {
        return this._height;
    }

    public get shape() {
        return this._shape;
    }

    public get x() {
        return this._x;
    }

    public get y() {
        return this._y;
    }

    public get id() {
        return this._id;
    }

    public left() {
        this._x -= 1;
    }

    public right() {
        this._x += 1;
    }

    public down() {
        this._y += 1;
    }

    public rotate() {

        for (let y = 0; y < this.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [this._shape[x][y], this._shape[y][x]] = [this._shape[y][x], this._shape[x][y]];
            }
        }
        //this.shape.forEach(row => row.reverse());
    }

    public clone() {
        const clone = new Tetrimino(this.id);
        clone._shape = JSON.parse(JSON.stringify(this.shape));
        clone._x = this._x;
        clone._y = this._y;
        return clone;
    }

}