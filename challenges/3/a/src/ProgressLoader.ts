import { randomColor } from './util';

export class ProgressLoader {
    private _progress: number;
    private _context: CanvasRenderingContext2D;
    private _color: string;

    constructor(
        private _canvas: HTMLCanvasElement
    ) {
        const {
            progress,
            color = randomColor(),
        } = this._canvas.dataset

        this._progress = progress ? parseInt(progress, 10) : 0;
        this._color = color;

        this._context = _canvas.getContext('2d');
        this._draw();
    }

    public get progress() {
        return this._progress;
    }

    public set progress(newProgress: number) {
        this._progress = newProgress;
        this._draw();
    }

    public get isDone() {
        return this._progress === 100;
    }

    private _draw() {
        const {
            width,
            height,
        } = this._canvas;
        const currentWidth = width * this._progress / 100;

        this._context.fillStyle = '#eee';
        this._context.fillRect(0, 0, width, height);

        this._context.fillStyle = this._color;
        this._context.fillRect(0, 0, currentWidth, height);
    }
}
