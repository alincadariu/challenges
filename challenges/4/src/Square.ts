const squareSize = {
    width: 40,
    height: 40,
}

export type CanvasPosition = {
    x: number,
    y: number
}

export class Square {

    private _context: CanvasRenderingContext2D;

    constructor(
        private _canvas: HTMLCanvasElement,
    ) {
        this._context = this._canvas.getContext('2d');
    }

    public update(position: CanvasPosition) {
        const isAtEdge = position.x >= this._canvas.width - squareSize.width && position.x <= this._canvas.width;
        this._draw(position, isAtEdge);
    }

    private _draw(position: CanvasPosition, isAtEdge: boolean) {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._context.fillStyle = 'black';
        this._context.fillRect(position.x, position.y, squareSize.width, squareSize.height);
        if (isAtEdge) {
            this._context.fillRect(
                position.x - this._canvas.width,
                position.y,
                squareSize.width,
                squareSize.height
            );
        }
    }

    get getSquareSize() {
        return squareSize;
    }

}