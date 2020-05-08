const PROGRESS_LOADER_STYLE = `width: 350px;
height: 30px;
background-color: #D3D3D3;
margin-bottom: 10px;
border-radius: 25px;`;

const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export class ProgressLoader {

    private _canvContext: CanvasRenderingContext2D;
    private _canv: HTMLCanvasElement = document.createElement('canvas');
    private _progress: number;
    private _color: string;

    constructor(private _element: HTMLDivElement) {
        this._element.setAttribute('style', PROGRESS_LOADER_STYLE);
        this._canv.width = this._element.offsetWidth;
        this._canv.height = this._element.offsetHeight;
        this._element.appendChild(this._canv);
        this._canvContext = this._canv.getContext('2d');
        this._progress = parseInt(this._element.dataset['progress'], 10) || 0;
        this._color = this._element.dataset['color'] || randomColor;
        if (!(this._progress === 0)) this.progress = this._progress;
    }

    get isDone() {
        return (this._progress / 100 * this._canv.width) === this._canv.width;
    }
    get progress() {
        return this._progress;
    }

    set progress(percent: number) {
        this._canvContext.clearRect(0, 0, this._canv.width, this._canv.height);
        this._canvContext.lineWidth = this._canv.height;
        this._canvContext.lineCap = 'round';
        this._canvContext.strokeStyle = this._color;
        this._progress = Math.min(percent, this._canv.width);
        let progress = this.convertPercent(this._progress);
        this._canvContext.beginPath();
        this._canvContext.moveTo(this._canv.height / 2, this._canv.height / 2);
        this._canvContext.lineTo(progress, this._canv.height / 2);
        this._canvContext.stroke();
    }

    private convertPercent(percent: number) {
        return (percent / 100) * (this._canv.width - this._canv.height) + this._canv.height / 2;
    }
}