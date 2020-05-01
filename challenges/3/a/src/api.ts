const random = (min: number, max: number) => Math.floor(Math.random() * max) + min;
const randomRGB = () => `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;

const PROGRESS_LOADER_STYLE = `
    width: 400px;
    height: 45px;
    margin-bottom: 10px;
    border-radius: 25px;
`;

export class ProgressLoader {
    private _progress: number;
    private _color: string;
    private _context: CanvasRenderingContext2D;

    constructor(
        private _canvas: HTMLCanvasElement,
    ) {
        this._color = this._canvas.dataset['color'] || randomRGB();
        this._context = this._canvas.getContext('2d');
        this.progress = parseInt(this._canvas.dataset['progress'], 10) || 0;
        this._canvas.setAttribute('style', PROGRESS_LOADER_STYLE);
    }

    set progress(value) {
        const progress = Math.min(value, 100);
        this._progress = progress;
        this._draw();
    }

    get progress() {
        return this._progress;
    }

    get isDone() {
        return this._progress === 100;
    }

    private _draw() {
        const { width, height } = this._canvas;
        const coloredWidth = this._progress * width / 100;

        this._context.fillStyle = '#efefef';
        this._context.fillRect(coloredWidth, 0, width, height);

        this._context.fillStyle = this._color;
        this._context.fillRect(0, 0, coloredWidth, height);
    }
}