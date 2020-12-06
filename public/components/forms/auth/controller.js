import Validator from "../../../app/Validator.js";

export const authController = {
    parentTag: {
        name: 'form',
        class: 'auth-window',
    },
    header: {
        class: 'auth-window__title',
        text: 'Авторизация'
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
        email:'',
        password:'',
    },
    formEvents: [
        {
            type: 'submit',
            callback: function (event) {
                const form = event.target.closest('form');
                let submitError = false;
                Object.entries(authController.data).forEach(([key,item])=>{
                    console.log(Validator.validate(item,key))
                    if ((item!==''&&!Validator.validate(item,key))||item==='') {
                        submitError = true;
                        form.querySelector(`input[name="${key}"]`)
                            .closest('.auth-window-field')
                            .querySelector('.auth-window-field__error')
                            .style.opacity = 1;
                    }
                })
                if (submitError) {
                    event.preventDefault();
                } else {
                    console.log('Проверки по submit прошли успешно')
                }
            }
        },
        {
            type: 'focusout',
            callback: function (event) {
                const input = event.target.closest('input');
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
                        authController.data[input.name] = input.value;
                    } else if (input.value!=='') {
                        error.style.opacity = 1;
                    }
                    console.log(`Поле ${input.name} потеряло фокус`)
                }
            }
        },
        {
            type: 'focusin',
            callback: function (event) {
                const input = event.target.closest('input');
                if (input) {
                    const header = input.closest('.auth-window-field').querySelector('.auth-window-field__title')
                    const error = input.closest('.auth-window-field').querySelector('.auth-window-field__error');
                    input.placeholder = ''
                    header.classList.add('auth-window-field__title-show')
                    error.style.opacity = 0;
                    console.log(`Поле ${input.name} получило фокус`)
                }
            }
        },
    ],
}