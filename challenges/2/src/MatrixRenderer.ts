interface MatrixOptions {
    matrix: number[][];
    color: string;
}

const CELL_SIZE = 50;

const CONTAINER_CSS = `
    display: flex;
    flex-wrap: wrap;
`;

const CELL_CSS = `
    width: ${CELL_SIZE}px;
    height: ${CELL_SIZE}px;
`;

export class MatrixRenderer {
    public readonly matrixElement: HTMLDivElement;

    constructor({
        matrix,
        color,
    }: MatrixOptions) {
        this.matrixElement = document.createElement('div');
        this.matrixElement.classList.add('matrix-container');
        const [row] = matrix;
        this.matrixElement.setAttribute('style', CONTAINER_CSS);
        this.matrixElement.style.setProperty('max-width', `${CELL_SIZE * row.length}px`);

        matrix.forEach((row, rowIdx) => {
            row.forEach((column, colIdx) => {
                const cell = document.createElement('div');
                cell.classList.add('matrix-cell');
                cell.setAttribute('style', CELL_CSS);
                cell.style.setProperty('background-color', !!column ? color : 'white');
                cell.dataset['row'] = `${rowIdx}`;
                cell.dataset['col'] = `${colIdx}`;
                this.matrixElement.appendChild(cell);
            });
        });
    }
}
