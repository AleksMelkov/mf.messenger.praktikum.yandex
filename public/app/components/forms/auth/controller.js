import Validator from "../../../Validator.js";
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
            header: 'Почта',
            type: 'text',
            name: 'email',
            placeholder: 'Почта',
            errorText: 'Неверная почта',
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
        email: '',
        password: '',
    },
    events: [
        {
            type: 'submit',
            callback: function (event) {
                event.preventDefault();
                var form = event.target.closest('form');
                var submitError = false;
                if (!form) {
                    return;
                }
                Object.entries(authController.data).forEach(function (_a) {
                    var key = _a[0], item = _a[1];
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
                if (!submitError) {
                    form.submit();
                }
            }
        },
        {
            type: 'focusout',
            callback: function (event) {
                var input = event.target.closest('input');
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
                var input = event.target.closest('input');
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