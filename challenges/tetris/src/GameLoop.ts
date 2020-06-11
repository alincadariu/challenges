export type GameLoopAction = (frame: number) => void;

export type GameLoopEvent = {
    id: string;
    fps: number;
    action: GameLoopAction;
}

type InternalGameLoopEvent =
    GameLoopEvent & {
        paused: boolean;
    }

export class GameLoop {
    public get isStopped() {
        return this._stopped;
    }

    private _handle: number;
    private _events = new Map<string, InternalGameLoopEvent>();
    private _eventStartMap = new Map<string, number>();
    private _stopped = false;

    constructor() { }

    public addEvent(event: GameLoopEvent) {
        this._events.set(event.id, {
            ...event,
            paused: false,
        });

        this._eventStartMap.set(event.id, performance.now());
    }

    public pauseEvent(id: string) {
        const event = this._events.get(id);

        if (!event) throw new Error(`Could not find event ${id}.`);

        event.paused = true;
    }

    public resumeEvent(id: string) {
        const event = this._events.get(id);

        if (!event) throw new Error(`Could not find event ${id}.`);

        event.paused = false;
    }

    public removeEvent(id: string) {
        this._events.delete(id);
    };

    public start() {
        this._stopped = false;
        this._handle = requestAnimationFrame((start) => {
            this._events.forEach((_, id) => this._eventStartMap.set(id, start));
            this._draw(start);
        });
    }

    public stop() {
        this._stopped = true;
    }

    private _draw(current: number) {
        if (this._stopped) {
            cancelAnimationFrame(this._handle);
            return;
        }

        this._events.forEach(({ fps, action, id, paused }) => {
            if (paused) { return; }

            const elapsed = current - this._eventStartMap.get(id);

            if (elapsed > 1000 / fps) {
                const frame = Math.floor(elapsed / 1000 * fps);
                action(frame);
                this._eventStartMap.set(id, current);
            }
        });

        this._handle = requestAnimationFrame((timestamp) => this._draw(timestamp));
    };
}
