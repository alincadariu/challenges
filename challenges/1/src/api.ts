// Progress API
class ProgressLoader {
    
    element: HTMLElement;
    progressNumber: number;
    defaultProgress: number = 0;
    bar: HTMLElement;
    color: string;
    defaultColor: string = 'rgb(46,204,113)';
    retrievedProgress: number;
    maxWidth:number = 100;

    constructor(element: HTMLElement) {
        this.element = element;
        this.retrievedProgress = parseInt(this.element.getAttribute('data-progress'), 10);
        this.progressNumber = isNaN(this.retrievedProgress) ? this.defaultProgress: this.retrievedProgress;
        this.color = this.element.getAttribute('data-color');
        this.bar = document.createElement('div');
        this.bar.setAttribute('class', 'bar');
        this.bar.style.width = `${this.progressNumber}%`; 
        this.bar.style.backgroundColor = this.color || this.defaultColor;
        this.element.appendChild(this.bar);
    }

    get isDone() {
        return this.progress === this.maxWidth;
    }

    get progress() {
        return this.progressNumber;
    }

    set progress(value: number) {
        if(this.progressNumber + value >= this.maxWidth) {
            this.progressNumber = this.maxWidth;
            this.bar.style.width = `${this.maxWidth}%`;
        }
        else {
            this.progressNumber += value;
            this.bar.style.width = `${this.progressNumber.toString()}%`;
        }
    }
}

export default ProgressLoader;

