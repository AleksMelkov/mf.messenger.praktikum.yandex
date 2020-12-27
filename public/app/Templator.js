var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var Templator = /** @class */ (function () {
    function Templator(template) {
        this._template = template;
    }
    Templator.prototype.get = function (obj, path, defaultValue) {
        var e_1, _a;
        if (defaultValue === void 0) { defaultValue = null; }
        var keys = path.split('.');
        var result = obj;
        try {
            for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                var key = keys_1_1.value;
                result = result[key];
                if (result === undefined) {
                    return defaultValue;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
            }
            finally { if (e_1) throw e_1.error; }
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
                        // window[newElement] = this.get(ctx,newElement);
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