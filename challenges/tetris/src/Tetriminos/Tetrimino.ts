import { TETRIMINOS, ROWS, COLUMNS } from '../constants';

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

    public rotated() {

        let newShape = Array.from({ length: this._width }, () => new Array());
        const flattened = this._shape.flat();

        for (let x = 0; x < this._width; x++) {
            for (let i = x; i < flattened.length; i += this._width) {
                newShape[x].push(flattened[i]);
            }
        }
        newShape.forEach(row => row.reverse());

        const clone = this.clone();
        clone._shape = newShape;
        [this._width, this._height] = [this.height, this.width];

        let overFlowingSquares = Math.max(0, (clone.x + clone.width) - COLUMNS);
        while (overFlowingSquares !== 0) {
            this.left();
            overFlowingSquares--;
        }

        this._shape = newShape;

    }

    public isAboveFloor() {
        return this._y + this._height < ROWS;
    };

    public canMoveLeft(board) {
        let canMove = true;

        this._shape.forEach((row, y) => {
            if (this._shape[y][0] === 0) { return; }
            canMove = canMove && board.state[this._y + y][this._x - 1] === 0;
        });

        return canMove;
    }

    public canMoveRight(board) {
        let canMove = true;

        this._shape.forEach((row, y) => {
            if (this._shape[y][this._width - 1] === 0) { return; }
            canMove = canMove && board.state[this._y + y][this._x + this._width] === 0;
        });

        return canMove;
    }

    public clone() {
        const clone = new Tetrimino(this.id);
        clone._shape = JSON.parse(JSON.stringify(this.shape));
        clone._x = this._x;
        clone._y = this._y;
        return clone;
    }

}