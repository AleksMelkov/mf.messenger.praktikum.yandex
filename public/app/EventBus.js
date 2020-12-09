var EventBus = /** @class */ (function () {
    function EventBus(isNew) {
        if (isNew === void 0) { isNew = false; }
        if (EventBus.__instance && !isNew) {
            return EventBus.__instance;
        }
        this.listeners = {};
        if (!isNew) {
            EventBus.__instance = this;
        }
    }
    EventBus.prototype.on = function (event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    };
    EventBus.prototype.off = function (event, callback) {
        var _this = this;
        this.listeners[event].forEach(function (item, key) {
            if (item === callback) {
                _this.listeners[event].splice(key, 1);
            }
        });
    };
    EventBus.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!Object.keys(this.listeners).includes(event)) {
            throw new Error("Missing event: " + event);
        }
        else {
            this.listeners[event].forEach(function (listener) {
                listener.apply(void 0, args);
            });
        }
    };
    return EventBus;
}());
export default EventBus;
//# sourceMappingURL=EventBus.js.map