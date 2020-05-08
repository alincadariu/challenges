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

    // destructure object
    constructor({
        color,
        matrix,
        onClick
    }: MatrixOptions) {
        this.matrixContainer = document.createElement('div');
        this.matrixContainer.setAttribute('style', MATRIX_CONTAINER_STYLE);
        const rowLength = matrix[0].length;
        this.matrixContainer.style.setProperty('max-width', `${CELL_SIZE * rowLength}px`);

        matrix.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                const canv = document.createElement('canvas');
                canv.width = CELL_SIZE;
                canv.height = CELL_SIZE;
                canv.addEventListener('click', () => onClick({
                    row: rowIndex,
                    column: columnIndex
                }));
                this.matrixContainer.append(canv);
                const canvContext = canv.getContext('2d');
                canvContext.clearRect(0, 0, canv.height, canv.width);
                canvContext.fillStyle = !!column ? color : 'white';
                canvContext.fillRect(0, 0, canv.height, canv.width);
                canvContext.stroke();
            });
        });
    }
}