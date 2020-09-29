export class Emitter {
    constructor() {
        this._events = {};
    }

    on(name, listener) {
        this._events[name] = [];

        this._events[name].push(listener);
    }

    emit(name, data) {
        const events = this._events[name];
        if (!events) return;
        events.forEach((event) => event(data));
    }
}