const COMMON_STYLE = `
    border-radius: 25px;
`;

const PROGRESS_STYLE = `
    ${COMMON_STYLE}
    height: 100%;
    transition: width 100ms ease-in;
`;

const PROGRESS_LOADER_STYLE = `
    ${COMMON_STYLE}
    width: 400px;
    height: 45px;
    background-color: #efefef;
    margin-bottom: 10px;
`;

const random = (min: number, max: number) => Math.floor(Math.random() * 255) + min;
const randomRGB = () => `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`

export class ProgressLoader {
    private _progressElement: HTMLDivElement = document.createElement('div');
    private _progress: number;
    private _color: string;

    constructor(
        private _element: HTMLElement,
    ) {
        const progress = parseInt(this._element.dataset['progress'], 10) || 0;
        this._color = this._element.dataset['color'] || randomRGB();
        this._element.setAttribute('style', PROGRESS_LOADER_STYLE);
        this._progressElement.setAttribute('style', PROGRESS_STYLE);
        this._progressElement.style.setProperty('background-color', this._color);
        this._element.append(this._progressElement);

        this.progress = progress;
    }

    set progress(value) {
        const progress = Math.min(value, 100);
        this._progress = progress;
        this._element.dataset['progress'] = `${progress} `;
        this._progressElement.style.setProperty('width', `${progress}% `);
    }

    get progress() {
        return this._progress;
    }

    get isDone() {
        return this._progress === 100;
    }
}