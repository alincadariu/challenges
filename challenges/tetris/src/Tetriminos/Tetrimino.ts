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
const PADDING = 1;

export class Tetrimino {

    public shape: number[][];
    public x: number;
    public y: number;
    public id: number;
    public cellSize: number;
    public padding: number;

    constructor() {
        this.id = Math.floor(Math.random() * 7);
        this.shape = Tetriminos[this.id];
        this.x = 0;
        this.y = 0;
        this.cellSize = CELL_SIZE;
        this.padding = PADDING;
    }

}