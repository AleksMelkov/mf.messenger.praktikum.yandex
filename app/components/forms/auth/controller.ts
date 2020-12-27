import Validator from "../../../Validator.js";
import Router from "../../../Router.js";
import { AuthSignin } from "../../../api/auth-api.js";

import { ROUTE_LIST } from "../../../routes/routeList.js";

const router = new Router();
const authSignin = new AuthSignin('/auth');

export const authController:Record<string, any> = {
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
        login:'',
        password:'',
    },
    methods: {
        submitForm(event:Event) {
            const form = (event.target as HTMLFormElement).closest('form');
            let submitError = false;
            if (!form) {
                return;
            }
            Object.entries(authController.data).forEach(([key,item])=>{
                if ((item!==''&&!Validator.validate(<string>item,key))||item==='') {
                    submitError = true;
                    const element = <HTMLElement>form.querySelector(`input[name="${key}"]`);
                    if (!element) {
                        return;
                    }
                    const field = <HTMLElement>element.closest('.auth-window-field');
                    if (!field) {
                        return;
                    }
                    const error = <HTMLElement>field.querySelector('.auth-window-field__error');
                    if (!error) {
                        return;
                    }
                    error.style.opacity = '1';
                }
            })
            if (!submitError) {
                authController.methods.userAuth(form);
            }
        },
        userAuth(form:HTMLFormElement) {
            authSignin.create(form.login.value,form.password.value).then(res=>{
                if (res.status!==200) {
                    const buttonBlock = document.querySelector(`.${authController.buttonBlock.class}`);
                    let errorBlock = document.querySelector('.auth-window-btnArea__error');
                    if (!errorBlock) {
                        errorBlock = document.createElement('div');
                        errorBlock.classList.add('auth-window-btnArea__error');
                    }
                    (buttonBlock as HTMLElement).prepend(errorBlock);
                    errorBlock.textContent = JSON.parse(res.responseText).reason;
                } else {
                    router.go(ROUTE_LIST.CHATS);
                }
            })
        }
    },
    events: [
        {
            type: 'submit',
            callback: function (event:Event) {
                event.preventDefault();
                authController.methods.submitForm(event);
            }
        },
        {
            type: 'focusout',
            callback: function (event:Event) {
                const input = (event.target as HTMLInputElement).closest('input');
                if (!input) {
                    return;
                }
                const field = input.closest('.auth-window-field');
                if (!field) {
                    return;
                }
                const header = <HTMLElement>field.querySelector('.auth-window-field__title');
                if (!header) {
                    return;
                }
                const error = <HTMLElement>field.querySelector('.auth-window-field__error');
                if (!error) {
                    return;
                }
                if (input.value==='') {
                    header.classList.remove('auth-window-field__title-show');
                    header.classList.add('auth-window-field__title-hide');
                    setTimeout(()=>{
                        header.classList.remove('auth-window-field__title-hide');
                        if (header.textContent) {
                            input.placeholder = header.textContent;
                        }
                    },300);
                    authController.data[input.name]='';
                }
                if (input.value!==''&&Validator.validate(input,input.name)) {
                    authController.data[input.name] = <string>input.value;
                } else if (input.value!=='') {
                    error.style.opacity = '1';
                }
                console.log(`Поле ${input.name} потеряло фокус`)
            }
        },
        {
            type: 'focusin',
            callback: function (event:Event) {
                const input = (event.target as HTMLInputElement).closest('input');
                if (!input) {
                    return;
                }
                const field = input.closest('.auth-window-field');
                if (!field) {
                    return;
                }
                const header = <HTMLElement>field.querySelector('.auth-window-field__title');
                if (!header) {
                    return;
                }
                const error = <HTMLElement>field.querySelector('.auth-window-field__error');
                if (!error) {
                    return;
                }
                input.placeholder = ''
                header.classList.add('auth-window-field__title-show')
                error.style.opacity = '0';
                console.log(`Поле ${input.name} получило фокус`)
            }
        },
    ],
}