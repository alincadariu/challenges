// Progress API
const DEFAULT_COLOR = 'rgb(46, 204, 113)';
const MAX_WIDTH = 100;
const DEFAULT_PROGRESS = 0;

class ProgressLoader {
    public element: HTMLElement;
    public bar: HTMLElement;
    public color: string;

    private _progress: number;

    constructor(element: HTMLElement) {
        this.element = element;
        const progress = parseInt(this.element.getAttribute('data-progress'), 10);
        this._progress = isNaN(progress) ? DEFAULT_PROGRESS : progress;
        this.color = this.element.getAttribute('data-color');
        this.bar = document.createElement('div');
        this.bar.setAttribute('class', 'bar');
        this.bar.style.width = `${this._progress}%`;
        this.bar.style.backgroundColor = this.color || DEFAULT_COLOR;
        this.element.appendChild(this.bar);
    }

    get isDone() {
        return this.progress === MAX_WIDTH;
    }

    get progress() {
        return this._progress;
    }

    set progress(value: number) {
        if (this._progress + value >= MAX_WIDTH) {
            this._progress = MAX_WIDTH;
            this.bar.style.width = `${MAX_WIDTH}%`;
        }
        else {
            this._progress += value;
            this.bar.style.width = `${this._progress.toString()}%`;
        }
    }
}

export default ProgressLoader;

