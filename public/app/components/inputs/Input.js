var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Block from "../Block.js";
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input(props, template) {
        return _super.call(this, props, template) || this;
    }
    Input.prototype.render = function () {
        if (!Object.keys(this.props.parent).includes('class')) {
            throw new Error('Не найден ключ class');
        }
        var className = 'class';
        var parser = new DOMParser();
        var input = parser.parseFromString(this.tmpl.compile(this.props), "text/html").querySelector("." + this.props.parent[className]);
        if (input && Object.keys(this.props).includes('events')) {
            this.props.events.forEach(function (formEvent) {
                input.addEventListener(formEvent.type, function (event) {
                    formEvent.callback(event);
                });
            });
        }
        return input;
    };
    return Input;
}(Block));
export default Input;
//# sourceMappingURL=Input.js.map