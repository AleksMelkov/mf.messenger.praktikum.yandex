import EventBus from "../EventBus.js";
var Block = /** @class */ (function () {
    function Block(props, template) {
        var _this = this;
        if (props === void 0) { props = {}; }
        this.setProps = function (nextProps) {
            if (!nextProps) {
                return;
            }
            var oldProps = Object.assign({}, _this.props);
            Object.assign(_this.props, nextProps);
            _this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, nextProps);
        };
        var eventBus = new EventBus();
        this._meta = {
            props: props
        };
        this.props = this._makePropsProxy(props);
        this.template = template;
        this.eventBus = function () { return eventBus; };
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }
    Block.prototype._registerEvents = function (eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    };
    Block.prototype.init = function () {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    };
    Block.prototype._componentDidMount = function () {
        this.componentDidMount(this.props);
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    };
    Block.prototype.componentDidMount = function (oldProps) {
        if (oldProps) {
            return true;
        }
        else {
            return false;
        }
    };
    Block.prototype._componentDidUpdate = function (oldProps, newProps) {
        var response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            this._render();
        }
    };
    Block.prototype.componentDidUpdate = function (oldProps, newProps) {
        return Object.keys(oldProps).every(function (item) {
            if (item in newProps && oldProps[item] === newProps[item]) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    Object.defineProperty(Block.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: false,
        configurable: true
    });
    Block.prototype._render = function () {
        this._element = this.render();
    };
    Block.prototype.render = function () {
    };
    Block.prototype.getContent = function () {
        return this.element;
    };
    Block.prototype._makePropsProxy = function (props) {
        return new Proxy(props, {
            get: function (target, prop) {
                if (prop.startsWith('_')) {
                    throw new Error('Нет доступа');
                }
                else {
                    if (!Object.keys(target).includes(prop)) {
                        throw new Error("\u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u043A\u043B\u044E\u0447 " + prop);
                    }
                    var value = target[prop];
                    return typeof value === "function" ? value.bind(target) : value;
                }
            },
            set: function (target, prop, value) {
                if (prop.startsWith('_')) {
                    throw new Error('Нет доступа');
                }
                else {
                    target[prop] = value;
                    return true;
                }
            },
            deleteProperty: function (target, prop) {
                if (prop.startsWith('_')) {
                    throw new Error('Нет доступа');
                }
                else {
                    delete target[prop];
                    return true;
                }
            }
        });
    };
    Block.prototype.show = function () {
        this.getContent().style.display = 'block';
    };
    Block.prototype.hide = function () {
        this.getContent().style.display = 'none';
    };
    Block.EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_RENDER: "flow:render",
        FLOW_CDU: "flow:component-did-update"
    };
    return Block;
}());
export default Block;
//# sourceMappingURL=Block.js.map