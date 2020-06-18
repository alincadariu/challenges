
import { CELL_SIZE, COLUMNS } from './Constants';
import { Tetrimino } from './Tetriminos/Tetrimino';
class GameBoard {

    public state: unknown[][];

    constructor(private _height: number, private _width: number) {
        this.clear();
    }

    public clear() {
        this.state = this.emptyBoard;
    }

    public get emptyBoard() {
        return Array.from({
            length: Math.round(this._height / CELL_SIZE)
        }, () => Array.from({
            length: Math.round(this._width / CELL_SIZE)
        }).fill(0));
    }

    public get isGameOver() {
        this.state[0].some(element => {
            if (element !== 0) { return true; }
        });

        return false;
    }


    public clearLines() {
        this.state.forEach((row, rowIndex) => {
            if (row.every(value => value > 0)) {
                // count number of lines
                this.state.splice(rowIndex, 1);
                this.state.unshift(Array(COLUMNS).fill(0));
            }
        });
        // document.getElementById("textLines").textContent = `Lines: ${this.lines}`;
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