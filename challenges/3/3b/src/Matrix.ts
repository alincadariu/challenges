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
        const {
            left: marginLeft,
            top: marginTop,
        } = this._canvas.getBoundingClientRect();

        this._canvas.style.setProperty('display', 'block');
        document.body.style.setProperty('margin', '0px');

        let width = window.innerWidth - marginLeft;
        let height = window.innerHeight - marginTop;

        this._draw(matrix,
            rowLength,
            colLength,
            width,
            height,
        );

        this._canvas.addEventListener('click', (ev) => {
            onClick({
                row: Math.floor((ev.clientY - marginTop) / CELL_SIZE),
                column: Math.floor((ev.clientX - marginLeft) / CELL_SIZE)
            });
        });

        window.addEventListener('resize', () => {
            width = window.innerWidth - marginLeft;
            height = window.innerHeight - marginTop;
            this._draw(matrix,
                rowLength,
                colLength,
                width,
                height,
            );
        });
    }

    get canvasElement() {
        return this._canvas;
    }

    private _draw(
        matrix: number[][],
        rowLength: number,
        colLength: number,
        width: number,
        height: number,
    ) {
        CELL_SIZE = Math.min(height / rowLength, width / colLength);
        this._canvas.width = CELL_SIZE * colLength;
        this._canvas.height = CELL_SIZE * rowLength;
        this._context.clearRect(0, 0, width, height);
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