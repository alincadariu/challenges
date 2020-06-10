export class GameLoop {
    public get isStopped() {
        return this._stopped;
    }

    private _handle: number;
    private _start: number;
    private _painter = (_: number) => { };
    private _stopped = true;

    constructor(
        private _fps: 24 | 30 | 60 | 120 | 240 = 240
    ) { }

    public addPainter(painter: (frame: number) => void) {
        this._painter = painter;
    }

    public start() {
        this._stopped = false;
        this._handle = requestAnimationFrame((start) => {
            this._start = start;
            this._draw(start, null);
        });
    }

    public stop() {
        this._stopped = true;
    }

    private _draw(start: number, current: number) {
        if (this._stopped) {
            cancelAnimationFrame(this._handle);
            return;
        }

        const elapsed = current - start;

        if (elapsed > 1000 / this._fps) {
            const frame = Math.floor((current - this._start) / 1000 * this._fps);
            this._painter(frame);
            start = current;
        }

        this._handle = requestAnimationFrame((timestamp) => this._draw(start, timestamp));
    };
}
