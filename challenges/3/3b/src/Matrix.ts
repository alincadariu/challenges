let CELL_SIZE = 50;
export interface MatrixClickEvent {
    column: number;
    row: number;
}

interface MatrixOptions {
    color: string;
    matrix: number[][];
    onClick: (ev: MatrixClickEvent) => void;
}

export class Matrix {
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _color: string;
    // destructure object
    constructor({
        color,
        matrix,
        onClick,
    }: MatrixOptions) {
        this._canvas = document.createElement('canvas');
        this._color = color;
        const rowLength = matrix[0].length;
        const colLength = matrix.length;
        this._context = this._canvas.getContext('2d');
        CELL_SIZE = window.innerWidth / rowLength;
        this._update(matrix, rowLength, colLength);
        const marginLeft = document.body.getBoundingClientRect().left;
        const marginTop = document.body.getBoundingClientRect().top;
        this._canvas.addEventListener('click', (ev) => {
            onClick({
                row: Math.floor((ev.clientY - marginTop) / CELL_SIZE),
                column: Math.floor((ev.clientX - marginLeft) / CELL_SIZE)
            });
        });
        window.addEventListener('resize', () => {
            this._update(matrix, rowLength, colLength);
        })
    }

    get canvasElement() {
        return this._canvas;
    }

    private _update(
        matrix: number[][],
        rowLength: number,
        colLength: number
    ) {
        CELL_SIZE = window.innerWidth / rowLength;
        this._canvas.width = CELL_SIZE * rowLength;
        this._canvas.height = CELL_SIZE * colLength;
        this._draw(matrix);
    }

    private _draw(
        matrix: number[][]
    ) {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        matrix.forEach((row, rowIndex) => this._renderRow(row, rowIndex));
    }

    private _renderRow(
        row: number[],
        rowIndex: number
    ) {
        row.forEach((column, colIndex) => this._renderCell(column, rowIndex, colIndex));
    }

    private _renderCell(
        column: number,
        rowIndex: number,
        columnIndex: number
    ) {
        this._context.fillStyle = !!column ? this._color : 'transparent';
        this._context.fillRect(rowIndex * CELL_SIZE, columnIndex * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
}