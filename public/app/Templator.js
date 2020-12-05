var Templator = /** @class */ (function () {
    function Templator(template) {
        this._template = template;
    }
    Templator.prototype.get = function (obj, path, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        var keys = path.split('.');
        var result = obj;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            result = result[key];
            if (result === undefined) {
                return defaultValue;
            }
        }
        return result !== null && result !== void 0 ? result : defaultValue;
    };
    Templator.prototype.compile = function (ctx) {
        return this._compileTemplate(this._template, ctx);
    };
    Templator.prototype._compileTemplate = function (template, ctx) {
        var _this = this;
        this._template = template;
        var stringAr = template.match(Templator.TEMPLATE_REGEXP);
        var tmpl = template;
        if (stringAr) {
            stringAr.forEach(function (item) {
                var newElement = item.replace('{{', '').replace(/\s*/g, '').replace('}}', '');
                if (newElement !== '') {
                    var re = new RegExp(item);
                    if (typeof _this.get(ctx, newElement) !== 'function') {
                        tmpl = tmpl.replace(re, _this.get(ctx, newElement));
                    }
                    else {
                        window[newElement] = _this.get(ctx, newElement);
                        tmpl = tmpl.replace(re, 'window.' + newElement + '()');
                    }
                }
            });
        }
        return tmpl;
    };
    Templator.TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;
    return Templator;
}());
export default Templator;
//# sourceMappingURL=Templator.js.map