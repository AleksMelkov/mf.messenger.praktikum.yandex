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
import Templator from "../../app/Templator.js";
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    function Form(props, template) {
        return _super.call(this, props, template) || this;
    }
    Form.prototype.render = function () {
        var tmpl = new Templator(this.template);
        var parser = new DOMParser();
        var form = document.createElement(this.props.parentTag.name);
        var className = 'elementClass';
        form.classList.add(this.props.parentTag.class);
        if (Object.keys(this.props).includes('header')) {
            var formHeader = document.createElement('div');
            formHeader.classList.add(this.props.header.class);
            formHeader.textContent = this.props.header.text;
            form.appendChild(formHeader);
        }
        this.props.fields.forEach(function (field) {
            var node = parser.parseFromString(tmpl.compile(field), "text/html").querySelector("." + field[className]);
            if (node) {
                form.appendChild(node);
            }
        });
        if (Object.keys(this.props).includes('buttonBlock')) {
            var buttonBlock = document.createElement('div');
            buttonBlock.classList.add(this.props.buttonBlock.class);
            form.appendChild(buttonBlock);
        }
        if (Object.keys(this.props).includes('formEvents')) {
            this.props.formEvents.forEach(function (formEvent) {
                form.addEventListener(formEvent.type, function (event) {
                    formEvent.callback(event);
                });
            });
        }
        return form;
    };
    return Form;
}(Block));
export default Form;
//# sourceMappingURL=Form.js.map