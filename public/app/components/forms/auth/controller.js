var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import Validator from "../../../Validator.js";
import Router from "../../../Router.js";
import { AuthSignin } from "../../../api/authApi.js";
import { ROUTE_LIST } from "../../../routes/routeList.js";
var router = new Router();
var authSignin = new AuthSignin('/auth');
export var authController = {
    parent: {
        name: 'form',
        class: 'auth-window',
    },
    header: {
        class: 'auth-window__title',
        text: 'Авторизация'
    },
    elements: [
        {
            elementClass: 'auth-window-field',
            header: 'Логин',
            type: 'text',
            name: 'login',
            placeholder: 'Логин',
            errorText: 'Неверный Логин',
        },
        {
            elementClass: 'auth-window-field',
            header: 'Пароль',
            type: 'password',
            name: 'password',
            placeholder: 'Пароль',
            errorText: 'Пароль должен содержать более 6 символов',
        },
    ],
    buttonBlock: {
        class: 'auth-window-btnArea'
    },
    data: {
        login: '',
        password: '',
    },
    methods: {
        submitForm: function (event) {
            var target = event.target;
            var form = target.closest('form');
            var submitError = false;
            if (!form) {
                return;
            }
            if (!authController.data) {
                return;
            }
            Object.entries(authController.data).forEach(function (_a) {
                var _b = __read(_a, 2), key = _b[0], item = _b[1];
                if ((item !== '' && !Validator.validate(item, key)) || item === '') {
                    submitError = true;
                    var element = form.querySelector("input[name=\"" + key + "\"]");
                    if (!element) {
                        return;
                    }
                    var field = element.closest('.auth-window-field');
                    if (!field) {
                        return;
                    }
                    var error = field.querySelector('.auth-window-field__error');
                    if (!error) {
                        return;
                    }
                    error.style.opacity = '1';
                }
            });
            if (!submitError && authController.methods) {
                authController.methods.userAuth(form);
            }
        },
        userAuth: function (form) {
            var data = {
                login: form.login.value,
                password: form.password.value,
            };
            authSignin.create(data).then(function (res) {
                if (res.status !== 200) {
                    if (!authController.buttonBlock) {
                        return;
                    }
                    var buttonBlock = document.querySelector("." + authController.buttonBlock.class);
                    var errorBlock = document.querySelector('.auth-window-btnArea__error');
                    if (!errorBlock) {
                        errorBlock = document.createElement('div');
                        if (!errorBlock) {
                            return;
                        }
                        errorBlock.classList.add('auth-window-btnArea__error');
                    }
                    if (buttonBlock instanceof HTMLElement)
                        buttonBlock.prepend(errorBlock);
                    if (JSON.parse(res.responseText).reason === 'user already in system') {
                        var windowWrapper = document.querySelector('.window-wrapper');
                        if (windowWrapper)
                            windowWrapper.remove();
                        router.go(ROUTE_LIST.CHATS);
                    }
                    errorBlock.textContent = JSON.parse(res.responseText).reason;
                }
                else {
                    var windowWrapper = document.querySelector('.window-wrapper');
                    if (windowWrapper)
                        windowWrapper.remove();
                    router.go(ROUTE_LIST.CHATS);
                }
            }).catch(function () {
                router.go(ROUTE_LIST.SERVER_ERROR);
            });
        }
    },
    events: [
        {
            type: 'submit',
            callback: function (event) {
                event.preventDefault();
                if (authController.methods)
                    authController.methods.submitForm(event);
            }
        },
        {
            type: 'focusout',
            callback: function (event) {
                var target = event.target;
                var input = target.closest('input');
                if (!input) {
                    return;
                }
                var field = input.closest('.auth-window-field');
                if (!field) {
                    return;
                }
                var header = field.querySelector('.auth-window-field__title');
                if (!header) {
                    return;
                }
                var error = field.querySelector('.auth-window-field__error');
                if (!error) {
                    return;
                }
                if (!authController.data) {
                    return;
                }
                if (input.value === '') {
                    header.classList.remove('auth-window-field__title-show');
                    header.classList.add('auth-window-field__title-hide');
                    setTimeout(function () {
                        header.classList.remove('auth-window-field__title-hide');
                        if (header.textContent) {
                            input.placeholder = header.textContent;
                        }
                    }, 300);
                    authController.data[input.name] = '';
                }
                if (input.value !== '' && Validator.validate(input, input.name)) {
                    authController.data[input.name] = input.value;
                }
                else if (input.value !== '') {
                    error.style.opacity = '1';
                }
                console.log("\u041F\u043E\u043B\u0435 " + input.name + " \u043F\u043E\u0442\u0435\u0440\u044F\u043B\u043E \u0444\u043E\u043A\u0443\u0441");
            }
        },
        {
            type: 'focusin',
            callback: function (event) {
                var target = event.target;
                var input = target.closest('input');
                if (!input) {
                    return;
                }
                var field = input.closest('.auth-window-field');
                if (!field) {
                    return;
                }
                var header = field.querySelector('.auth-window-field__title');
                if (!header) {
                    return;
                }
                var error = field.querySelector('.auth-window-field__error');
                if (!error) {
                    return;
                }
                input.placeholder = '';
                header.classList.add('auth-window-field__title-show');
                error.style.opacity = '0';
                console.log("\u041F\u043E\u043B\u0435 " + input.name + " \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E \u0444\u043E\u043A\u0443\u0441");
            }
        },
    ],
};
//# sourceMappingURL=controller.js.map