export interface ISquare {
    position: {
        x: number,
        y: number,
    };
    size: number;
    canvas: HTMLCanvasElement;
}


export class Square {
    public get isAtBottom() {
        return this.position.y >= this._meta.canvas.height - this.size;
    }

    public get isAtEdge() {
        return this.position.x >= this._meta.canvas.width - this.size &&
            this.position.x <= this._meta.canvas.width
    }

    public get size() {
        return this._meta.size;
    }

    public get position() {
        return this._meta.position;
    }

    constructor(
        private _meta: ISquare,
    ) { }

    public moveUp = (displacement: number) => {
        this.position.y = this.position.y <= 0
            ? 0
            : this.position.y -= displacement;
    }

    public moveLeft = (displacement: number) => {
        this.position.x = this.position.x <= 0
            ? this._meta.canvas.width - displacement
            : this.position.x -= displacement;
    }

    public moveRight = (displacement: number) => {
        this.position.x = this.position.x >= this._meta.canvas.width - displacement
            ? 0 :
            this.position.x += displacement;
    }

    public moveDown = (displacement: number) => {
        if (this.size + this.position.y >= this._meta.canvas.height) {
            this.position.y = this._meta.canvas.height - this.size;
        } else {
            this.position.y += displacement;
        }
    }

    public setY = (y) => this.position.y = y;
}