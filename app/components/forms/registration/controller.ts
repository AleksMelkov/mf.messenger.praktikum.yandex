import Validator from "../../../Validator.js";

export const registrationController:Record<string, any> = {
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
    data:{
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
            callback: function (event:Event) {
                event.preventDefault();
                const form = (event.target as HTMLFormElement).closest('form');
                if (!form) {
                    return;
                }
                let submitError = false;
                Object.entries(registrationController.data).forEach(([key,item])=>{
                    if ((item!==''&&!Validator.validate(<string>item,key))||item==='') {
                        submitError = true;
                        (((form.querySelector(`input[name="${key}"]`) as HTMLInputElement)
                            .closest('.auth-window-field') as HTMLElement)
                            .querySelector('.auth-window-field__error') as HTMLElement)
                            .style.opacity = '1';
                    }
                });
                if (registrationController.data.password!==registrationController.data.repeat_password) {
                    submitError = true;
                    (((form.querySelector('input[type="repeat_password"]') as HTMLInputElement)
                        .closest('.auth-window-field') as HTMLElement)
                        .querySelector('.auth-window-field__error') as HTMLElement)
                        .style.opacity = '1';
                }
                if (!submitError) {
                    form.submit();
                }
            }
        },
        {
            type: 'focusout',
            callback: function (event:Event) {
                let input:HTMLInputElement|null = (event.target as HTMLInputElement).closest('input')
                if (!input) {
                    return;
                }
                const header:HTMLElement|null = (input.closest('.auth-window-field') as HTMLElement).querySelector('.auth-window-field__title');
                if (!header) {
                    return
                }
                const error:HTMLElement|null = (input.closest('.auth-window-field') as HTMLElement).querySelector('.auth-window-field__error');
                if (!error) {
                    return;
                }
                if (input.value==='') {
                    header.classList.remove('auth-window-field__title-show');
                    header.classList.add('auth-window-field__title-hide');
                    setTimeout(()=>{
                        header.classList.remove('auth-window-field__title-hide');
                        if (!input) {
                            return;
                        }
                        input.placeholder = <string>header.textContent;
                    },300);
                    registrationController.data[<string>input.name]='';
                }
                if (input.value!==''&&Validator.validate(input,input.name)) {
                    registrationController.data[input.name] = input.value;
                } else if (input.value!=='') {
                    error.style.opacity = '1';
                }

            }
        },
        {
            type: 'focusin',
            callback: function (event:Event) {
                let input = (event.target as HTMLInputElement).closest('input')
                if (!input) {
                    return
                }
                const header:HTMLElement|null = (input.closest('.auth-window-field') as HTMLElement).querySelector('.auth-window-field__title');
                if (!header) {
                    return;
                }
                const error:HTMLElement|null = (input.closest('.auth-window-field') as HTMLElement).querySelector('.auth-window-field__error');
                if (!error) {
                    return;
                }
                input.placeholder = ''
                header.classList.add('auth-window-field__title-show')
                error.style.opacity = '0';
            }
        },
    ],
}