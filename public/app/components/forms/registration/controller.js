import Validator from "../../../Validator.js";
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
    events: [
        {
            type: 'submit',
            callback: function (event) {
                event.preventDefault();
                var form = event.target.closest('form');
                if (!form) {
                    return;
                }
                var submitError = false;
                Object.entries(registrationController.data).forEach(function (_a) {
                    var key = _a[0], item = _a[1];
                    if ((item !== '' && !Validator.validate(item, key)) || item === '') {
                        submitError = true;
                        form.querySelector("input[name=\"" + key + "\"]")
                            .closest('.auth-window-field')
                            .querySelector('.auth-window-field__error')
                            .style.opacity = '1';
                    }
                });
                if (registrationController.data.password !== registrationController.data.repeat_password) {
                    submitError = true;
                    form.querySelector('input[type="repeat_password"]')
                        .closest('.auth-window-field')
                        .querySelector('.auth-window-field__error')
                        .style.opacity = '1';
                }
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
                var header = input.closest('.auth-window-field').querySelector('.auth-window-field__title');
                if (!header) {
                    return;
                }
                var error = input.closest('.auth-window-field').querySelector('.auth-window-field__error');
                if (!error) {
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
                var input = event.target.closest('input');
                if (!input) {
                    return;
                }
                var header = input.closest('.auth-window-field').querySelector('.auth-window-field__title');
                if (!header) {
                    return;
                }
                var error = input.closest('.auth-window-field').querySelector('.auth-window-field__error');
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