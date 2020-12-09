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
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List(props, template) {
        return _super.call(this, props, template) || this;
    }
    List.prototype.render = function () {
        var _this = this;
        var parser = new DOMParser();
        var parentList = document.createElement(this.props.parent.name);
        parentList.classList.add(this.props.parent.class);
        var className = 'class';
        this.props.elements.forEach(function (chat) {
            var node = parser.parseFromString(_this.tmpl.compile(chat), "text/html").querySelector("." + chat[className]);
            if (node) {
                parentList.appendChild(node);
            }
        });
        if (Object.keys(this.props).includes('events')) {
            this.props.events.forEach(function (formEvent) {
                parentList.addEventListener(formEvent.type, function (event) {
                    formEvent.callback(event);
                });
            });
        }
        return parentList;
    };
    return List;
}(Block));
export default List;
//# sourceMappingURL=List.js.map