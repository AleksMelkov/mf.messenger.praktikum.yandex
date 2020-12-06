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
import Templator from "../../Templator.js";
var Content = /** @class */ (function (_super) {
    __extends(Content, _super);
    function Content(props, template) {
        return _super.call(this, props, template) || this;
    }
    Content.prototype.render = function () {
        var tmpl = new Templator(this.template);
        if (Object.keys(this.props).includes('class')) {
            var className = 'class';
            var parser = new DOMParser();
            return parser.parseFromString(tmpl.compile(this.props), "text/html").querySelector("." + this.props[className]);
        }
    };
    return Content;
}(Block));
export default Content;
//# sourceMappingURL=Content.js.map