import Validator from "../../../Validator.js";

export const registrationController = {
    parentTag: {
        name: 'form',
        class: 'auth-window',
    },
    header: {
        class: 'register-window__title',
        text: 'Регистрация'
    },
    fields: [
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
    data:{
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        password: '',
        repeat_password: '',
    },
    formEvents: [
        {
            type: 'submit',
            callback: function (event) {
                event.preventDefault();
                const form = event.target.closest('form');
                let submitError = false;
                Object.entries(registrationController.data).forEach(([key,item])=>{
                    if ((item!==''&&!Validator.validate(item,key))||item==='') {
                        submitError = true;
                        form.querySelector(`input[name="${key}"]`)
                            .closest('.auth-window-field')
                            .querySelector('.auth-window-field__error')
                            .style.opacity = 1;
                    }
                });
                if (registrationController.data.password!==registrationController.data.repeat_password) {
                    submitError = true;
                    form.querySelector('input[type="repeat_password"]')
                        .closest('.auth-window-field')
                        .querySelector('.auth-window-field__error')
                        .style.opacity = 1;
                }
                if (!submitError) {
                    form.submit();
                }
            }
        },
        {
            type: 'focusout',
            callback: function (event) {
                let input = event.target.closest('input')
                if (input) {
                    const header = input.closest('.auth-window-field').querySelector('.auth-window-field__title')
                    const error = input.closest('.auth-window-field').querySelector('.auth-window-field__error');
                    if (input.value==='') {
                        header.classList.remove('auth-window-field__title-show');
                        header.classList.add('auth-window-field__title-hide');
                        setTimeout(()=>{
                            header.classList.remove('auth-window-field__title-hide');
                            input.placeholder = header.textContent;
                        },300);
                        registrationController.data[input.name]='';
                    }
                    if (input.value!==''&&Validator.validate(input,input.name)) {
                        registrationController.data[input.name] = input.value;
                    } else if (input.value!=='') {
                        error.style.opacity = 1;
                    }
                }
            }
        },
        {
            type: 'focusin',
            callback: function (event) {
                let input = event.target.closest('input')
                if (input) {
                    const header = input.closest('.auth-window-field').querySelector('.auth-window-field__title')
                    const error = input.closest('.auth-window-field').querySelector('.auth-window-field__error');
                    input.placeholder = ''
                    header.classList.add('auth-window-field__title-show')
                    error.style.opacity = 0;
                }
            }
        },
    ],
}