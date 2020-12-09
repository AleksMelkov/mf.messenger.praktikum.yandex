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
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(props, template) {
        return _super.call(this, props, template) || this;
    }
    Button.prototype.render = function () {
        if (Object.keys(this.props).includes('parent')) {
            if (!this.props.parent.class) {
                throw new Error('Родительский элемент обязательно должен иметь класс');
            }
            var className = 'class';
            var parser = new DOMParser();
            var button_1 = parser.parseFromString(this.tmpl.compile(this.props), "text/html").querySelector("." + this.props.parent[className]);
            if (button_1 && Object.keys(this.props).includes('events')) {
                if (!Array.isArray(this.props.events)) {
                    throw new Error('Свойство events должно быть массивом');
                }
                this.props.events.forEach(function (item) {
                    button_1.addEventListener(item.type, function (event) {
                        item.callback(event);
                    });
                });
            }
            return button_1;
        }
    };
    return Button;
}(Block));
export default Button;
//# sourceMappingURL=Button.js.map