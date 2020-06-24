import { COLUMNS } from './constants';
import { Tetrimino } from './Tetriminos/Tetrimino';
export class GameBoard {

    public state: unknown[][];
    private _completedLines: number;

    constructor(private _height: number, private _width: number) {
        this.state = this.clearBoard();
        this._completedLines = 0;
        document.getElementById("textLines").textContent = `LINES: ${this._completedLines}`;
    }

    public addCompletedLine() {
        this._completedLines += 1;
    }

    public clearBoard() {
        return Array.from({
            length: Math.round(this._height)
        }, () => Array.from({
            length: Math.round(this._width)
        }).fill(0));
    }

    public get isGameOver() {
        return this.state[1].some(element => {
            return element !== 0
        });
    }


    public checkCompletedLines() {
        this.state.forEach((row, rowIndex) => {
            if (row.every(value => value > 0)) {
                this.addCompletedLine();
                this.state.splice(rowIndex, 1);
                this.state.unshift(Array(COLUMNS).fill(0));
            }
        });
        document.getElementById("textLines").textContent = `LINES: ${this._completedLines}`;
    }

    public freeze(tetrimino: Tetrimino) {
        tetrimino.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.state[y + tetrimino.y][x + tetrimino.x] = value;
                }
            });
        });
    }
}