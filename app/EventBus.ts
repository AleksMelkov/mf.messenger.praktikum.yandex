export default class EventBus {
    protected listeners:Record<string, Function[]>;

    static __instance:EventBus;

    constructor(isNew = false) {
      if (EventBus.__instance && !isNew) {
        return EventBus.__instance;
      }
      this.listeners = {};
      if (!isNew) {
        EventBus.__instance = this;
      }
    }

    public on(event: string, callback:() => void):void {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(callback);
    }

    public off(event: string, callback:unknown):void {
      this.listeners[event].forEach((item: unknown, key: number) => {
        if (item === callback) {
          this.listeners[event].splice(key, 1);
        }
      });
    }

    public emit(event:string, ...args:any):void {
      if (!Object.keys(this.listeners).includes(event)) {
        throw new Error(`Missing event: ${event}`);
      } else {
        this.listeners[event].forEach((listener) => {
          listener(...args);
        });
      }
    }
}
