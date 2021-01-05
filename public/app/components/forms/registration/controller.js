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
import { AuthSignup } from "../../../api/authApi.js";
import Router from "../../../Router.js";
import { ROUTE_LIST } from "../../../routes/routeList.js";
var authSignup = new AuthSignup('/auth');
var router = new Router();
export var registrationController = {
    parent: {
        name: 'form',
        class: 'auth-window',
    },
    header: {
        class: 'register-window__title',
        text: 'Регистрация'
    },
    elements: [
        {
            elementClass: 'auth-window-field',
            header: 'Почта',
            type: 'text',
            name: 'email',
            placeholder: 'Почта',
            errorText: 'Неверная почта',
        },
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
            header: 'Имя',
            type: 'text',
            name: 'first_name',
            placeholder: 'Имя',
            errorText: 'Имя не введено',
        },
        {
            elementClass: 'auth-window-field',
            header: 'Фамилия',
            type: 'text',
            name: 'second_name',
            placeholder: 'Фамилия',
            errorText: 'Фамилия не введена',
        },
        {
            elementClass: 'auth-window-field',
            header: 'Пароль',
            type: 'password',
            name: 'password',
            placeholder: 'Пароль',
            errorText: 'Пароль должен содержать более 6 символов',
        },
        {
            elementClass: 'auth-window-field',
            header: 'Повторите пароль',
            type: 'password',
            name: 'repeat_password',
            placeholder: 'Повторите пароль',
            errorText: 'Пароли не совпадают',
        },
    ],
    buttonBlock: {
        class: 'register-window-btnArea'
    },
    data: {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        password: '',
        repeat_password: '',
    },
    methods: {
        submitForm: function (event) {
            var target = event.target;
            var form = target.closest('form');
            if (!form) {
                return;
            }
            var submitError = false;
            if (!registrationController.data) {
                return;
            }
            Object.entries(registrationController.data).forEach(function (_a) {
                var _b = __read(_a, 2), key = _b[0], item = _b[1];
                if ((item !== '' && !Validator.validate(item, key)) || item === '') {
                    submitError = true;
                    var input = form.querySelector("input[name=\"" + key + "\"]");
                    if (!input) {
                        return;
                    }
                    var field = input.closest('.auth-window-field');
                    if (!field) {
                        return;
                    }
                    var fieldError = field.querySelector('.auth-window-field__error');
                    if (fieldError)
                        fieldError.style.opacity = '1';
                }
            });
            if (registrationController.data.password !== registrationController.data.repeat_password) {
                submitError = true;
                var input = form.querySelector('input[type="repeat_password"]');
                if (!input) {
                    return;
                }
                var field = input.closest('.auth-window-field');
                if (!field) {
                    return;
                }
                var fieldError = field.querySelector('.auth-window-field__error');
                if (fieldError)
                    fieldError.style.opacity = '1';
            }
            if (!submitError && registrationController.methods) {
                registrationController.methods.registerUser();
            }
        },
        registerUser: function () {
            if (!registrationController.data) {
                return;
            }
            var data = {
                first_name: registrationController.data.first_name,
                second_name: registrationController.data.second_name,
                login: registrationController.data.login,
                email: registrationController.data.email,
                password: registrationController.data.password,
                phone: '+79009009090'
            };
            authSignup.create(data).then(function (res) {
                if (res.status !== 200) {
                    if (!registrationController.buttonBlock) {
                        return;
                    }
                    var buttonBlock = document.querySelector("." + registrationController.buttonBlock.class);
                    var errorBlock = document.querySelector('.auth-window-btnArea__error');
                    if (!errorBlock) {
                        errorBlock = document.createElement('div');
                        if (!errorBlock) {
                            return;
                        }
                        errorBlock.classList.add('auth-window-btnArea__error');
                    }
                    if (buttonBlock)
                        buttonBlock.prepend(errorBlock);
                    errorBlock.textContent = JSON.parse(res.responseText).reason;
                }
                else {
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
                if (registrationController.methods)
                    registrationController.methods.submitForm(event);
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
                if (!registrationController.data) {
                    return;
                }
                if (input.value === '') {
                    header.classList.remove('auth-window-field__title-show');
                    header.classList.add('auth-window-field__title-hide');
                    setTimeout(function () {
                        header.classList.remove('auth-window-field__title-hide');
                        if (!input) {
                            return;
                        }
                        input.placeholder = header.textContent;
                    }, 300);
                    registrationController.data[input.name] = '';
                }
                if (input.value !== '' && Validator.validate(input, input.name)) {
                    registrationController.data[input.name] = input.value;
                }
                else if (input.value !== '') {
                    error.style.opacity = '1';
                }
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
            }
        },
    ],
};
//# sourceMappingURL=controller.js.map