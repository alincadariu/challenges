const MATRIX_CONTAINER_STYLE = `display: flex;
flex-wrap: wrap;`;

const MATRIX_ELEMENT_STYLE = `width: 50px;
height: 50px;`;

const CELL_SIZE = 50;

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

    public readonly matrixContainer: HTMLDivElement;
    private _canv: HTMLCanvasElement;

    // destructure object
    constructor({
        color,
        matrix,
        onClick
    }: MatrixOptions) {
        this.matrixContainer = document.createElement('div');
        this.matrixContainer.setAttribute('style', MATRIX_CONTAINER_STYLE);
        const rowLength = matrix[0].length;
        const colLength = matrix.length;
        this.matrixContainer.style.setProperty('max-width', `${CELL_SIZE * rowLength}px`);
        this._canv = document.createElement('canvas');
        this._canv.width = CELL_SIZE * rowLength;
        this._canv.height = CELL_SIZE * colLength;
        this.matrixContainer.append(this._canv);
        this._canv.addEventListener('click', (ev) => {
            onClick({
                row: Math.floor((ev.clientY - 7) / CELL_SIZE),
                column: Math.floor((ev.clientX - 7) / CELL_SIZE)
            });
        });
        matrix.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                const canvContext = this._canv.getContext('2d');
                canvContext.clearRect(rowIndex * CELL_SIZE, columnIndex * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                canvContext.fillStyle = !!column ? color : 'white';
                canvContext.fillRect(rowIndex * CELL_SIZE, columnIndex * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                canvContext.stroke();
            });
        });
    }
}