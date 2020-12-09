var Validator = /** @class */ (function () {
    function Validator() {
    }
    Validator.validate = function (node, type) {
        switch (type) {
            case 'phone':
                return Validator.phones(node);
            case 'first_name':
                return Validator.names(node);
            case 'second_name':
                return Validator.names(node);
            case 'display_name':
                return Validator.names(node);
            case 'email':
                return Validator.emails(node);
            case 'login':
                return Validator.logins(node);
            case 'password':
                return Validator.passwords(node);
            case 'old_password':
                return Validator.passwords(node);
            case 'new_password':
                return Validator.passwords(node);
            case 'repeat_password':
                return Validator.passwords(node);
            default:
                throw new Error("\u0442\u0438\u043F \u043F\u043E\u043B\u044F " + type + " \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u0432\u0430\u043B\u0438\u0434\u0430\u0442\u043E\u0440\u043E\u043C");
        }
    };
    Validator.phones = function (value) {
        var string = typeof value === 'string' ? value : Validator.getValue(value);
        return (string === null || string === void 0 ? void 0 : string.match(Validator.REG_EXP.PHONE)) ? true : false;
    };
    Validator.names = function (value) {
        var string = typeof value === 'string' ? value : Validator.getValue(value);
        return (string === null || string === void 0 ? void 0 : string.match(Validator.REG_EXP.NAME)) ? true : false;
    };
    Validator.emails = function (value) {
        var string = typeof value === 'string' ? value : Validator.getValue(value);
        return (string === null || string === void 0 ? void 0 : string.match(Validator.REG_EXP.EMAIL)) ? true : false;
    };
    Validator.logins = function (value) {
        var string = typeof value === 'string' ? value : Validator.getValue(value);
        return (string === null || string === void 0 ? void 0 : string.match(Validator.REG_EXP.LOGIN)) ? true : false;
    };
    Validator.passwords = function (value) {
        var string = typeof value === 'string' ? value : Validator.getValue(value);
        if (string) {
            return (string === null || string === void 0 ? void 0 : string.length) > 6 ? true : false;
        }
        return false;
    };
    Validator.getValue = function (node) {
        if (node instanceof HTMLDivElement) {
            return node.textContent;
        }
        else if (node instanceof HTMLInputElement) {
            return node.value;
        }
    };
    Validator.REG_EXP = {
        PHONE: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
        NAME: /[а-я]*/,
        EMAIL: /[a-z]*@[a-z]*\.[a-z]*/,
        LOGIN: /[/\w]*/,
    };
    return Validator;
}());
export default Validator;
//# sourceMappingURL=Validator.js.map