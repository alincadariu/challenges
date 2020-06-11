const Tetriminos = [
    [[0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]],

    [[2, 0, 0],
    [2, 2, 2],
    [0, 0, 0]],

    [[0, 0, 3],
    [3, 3, 3],
    [0, 0, 0]],

    [[4, 4],
    [4, 4]],

    [[0, 5, 5],
    [5, 5, 0],
    [0, 0, 0]],

    [[0, 6, 0],
    [6, 6, 6],
    [0, 0, 0]],

    [[7, 7, 0],
    [0, 7, 7],
    [0, 0, 0]]
];
const CELL_SIZE = 30;

export class Tetrimino {

    public shape: number[][];
    public x: number;
    public y: number;
    public color: string;
    public id: number;
    public cellSize: number;
    public distanceToLeft;
    public distanceToRight;

    constructor() {
        this.id = Math.floor(Math.random() * 7);
        this.shape = Tetriminos[this.id];
        this.x = 0;
        this.y = 0;
        this.cellSize = CELL_SIZE;

    }

    get distanceLeft() {
        this.distanceToLeftEdge();
        return this.distanceToLeft;
    }
    get distanceRight() {
        this.distanceToRightEdge();
        return this.distanceToRight;
    }

    public distanceToLeftEdge() {
        let nextState = { ...this, x: this.x, y: this.y + 1 };
        this.distanceToLeft = 100;
        nextState.shape.forEach((row) => {
            row.forEach((value, columnIndex) => {
                if (value > 0) {
                    this.distanceToLeft = Math.min(this.distanceToLeft, columnIndex);
                }
            });
        });
    }

    public distanceToRightEdge() {
        let nextState = { ...this, x: this.x, y: this.y + 1 };
        this.distanceToRight = 0;
        nextState.shape.forEach((row) => {
            row.forEach((value, columnIndex) => {
                if (value > 0) {
                    this.distanceToRight = Math.max(this.distanceToRight, columnIndex);
                }
            });
        });

    }
}