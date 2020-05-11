type MatrixValue = 1 | 0;

interface MatrixClickCellMeta {
    x: number;
    y: number;
    column: number;
    row: number;
    value: MatrixValue;
}

interface MatrixOptions {
    matrix: MatrixValue[][];
    color: string | CanvasGradient | CanvasPattern;
}

const CELL_SIZE = 50;

type MatrixEventMap = {
    'cellClick': (ev: CustomEvent<MatrixClickCellMeta>) => void,
};

type MatrixEvents = keyof MatrixEventMap;
type CanvasEvents = keyof HTMLElementEventMap;

declare interface MatrixCanvasElement extends HTMLCanvasElement {
    addEventListener<
        K extends MatrixEvents,
        T extends CanvasEvents,
        >(
            eventName: K | T,
            handler: (
                ev: T extends CanvasEvents
                    ? HTMLElementEventMap[T]
                    : MatrixEventMap[K]
            ) => void,
    );
}

export class MatrixRenderer {
    public readonly matrixElement: MatrixCanvasElement;
    private readonly _context: CanvasRenderingContext2D;
    private _matrix: MatrixValue[][];
    private _color: string | CanvasGradient | CanvasPattern;

    public set color(value: string | CanvasGradient | CanvasPattern) {
        this._color = value;
    }

    public set matrix(value: MatrixValue[][]) {
        this._matrix = value;
    }

    constructor({
        matrix,
        color,
    }: MatrixOptions) {
        this.matrixElement = document.createElement('canvas');
        this.matrixElement.addEventListener('click', this._clickEventListener);

        this._context = this.matrixElement.getContext('2d');
        this._matrix = matrix;
        this._color = color;
        this._setCanvasSize();
        this._draw();
    }

    public update() {
        this._setCanvasSize();
        this._draw();
    }

    public destroy() {
        this.matrixElement.removeEventListener('click', this._clickEventListener);
    }

    private _setCanvasSize = () => {
        const height = this._matrix.length * CELL_SIZE;
        const width = this._matrix[0].length * CELL_SIZE;

        this.matrixElement.width = width;
        this.matrixElement.height = height;
    }

    private _clickEventListener = (ev: MouseEvent) => {
        const { top, left } = this.matrixElement.getBoundingClientRect();
        const column = Math.floor((ev.clientX - left) / CELL_SIZE);
        const row = Math.floor((ev.clientY - top) / CELL_SIZE);

        const clickCellEvent = new CustomEvent<MatrixClickCellMeta>('cellClick', {
            bubbles: true,
            cancelable: false,
            detail: {
                column,
                row,
                x: ev.clientX,
                y: ev.clientY,
                value: this._matrix[row][column],
            }
        });

        this.matrixElement.dispatchEvent(clickCellEvent);
    }

    private _draw = () => requestAnimationFrame(() => {
        const { width, height } = this.matrixElement;
        this._context.clearRect(0, 0, width, height);

        this._loop((value, row, column) => {
            this._context.fillStyle = !!value ? this._color : 'transparent';
            this._context.fillRect(column * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        });
    });

    private _loop =
        (predicate: (value: MatrixValue, row: number, column: number) => void) => this._matrix
            .forEach((row, rowIdx) => {
                row.forEach((column, colIdx) => {
                    predicate(column, rowIdx, colIdx);
                });
            });
}
