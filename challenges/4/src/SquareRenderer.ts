
import { Square } from './Square';

export class SquareRenderer {

    private _context: CanvasRenderingContext2D;

    constructor(
        private _canvas: HTMLCanvasElement,
    ) {
        this._context = this._canvas.getContext('2d');
    }

    public update(square: Square) {
        const isAtEdge = square.position.x >= this._canvas.width - square.size && square.position.x <= this._canvas.width;
        this._draw(square, isAtEdge);
    }

    private _draw(square: Square, isAtEdge: boolean) {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._context.fillStyle = 'black';
        this._context.fillRect(square.position.x, square.position.y, square.size, square.size);
        if (isAtEdge) {
            this._context.fillRect(
                square.position.x - this._canvas.width,
                square.position.y,
                square.size,
                square.size
            );
        }
    }

}