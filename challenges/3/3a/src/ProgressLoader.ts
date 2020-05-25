import { randomColor } from '../../helpers';

const PROGRESS_LOADER_STYLE = `width: 40%;
height: 30px;
margin-bottom: 10px;
border-radius: 25px;`;

export class ProgressLoader {

    private _context: CanvasRenderingContext2D;
    private _progress: number;
    private _color: string;

    constructor(private _canvas: HTMLCanvasElement) {
        this._canvas.setAttribute('style', PROGRESS_LOADER_STYLE);
        this._context = this._canvas.getContext('2d');
        this._progress = parseInt(this._canvas.dataset['progress'], 10) || 0;
        this._color = this._canvas.dataset['color'] || randomColor();
        if (this._progress != null) this.progress = this._progress;

        window.addEventListener('resize', () => {
            const { width } = this._canvas.getBoundingClientRect();
            this._canvas.width = width;
            this._draw();
        });
    }

    get isDone() {
        return this._progress === 100;
    }
    get progress() {
        return this._progress;
    }

    set progress(percent: number) {
        this._progress = Math.min(percent, 100);
        this._draw();
    }

    private _draw() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        let progress = this._progress * this._canvas.width / 100;
        this._context.fillStyle = '#d3d3d3';
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this._context.fillStyle = this._color;
        this._context.fillRect(0, 0, progress, this._canvas.height);
    }
}