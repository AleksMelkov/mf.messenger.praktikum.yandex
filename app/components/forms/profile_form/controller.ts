import Validator from "../../../Validator.js";
import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS } from "../../../GlobalEvents.js";

const eventBus = new EventBus();


export const profileFormController:Record<string, any> = {
    parent: {
        name: 'div',
        class: 'profile-wrapper-form',
    },
    elements: [
        {
            elementClass: 'profile-wrapper-form__element',
            elementType: 'common',
            type: 'email',
            header: 'Почта',
            contenteditable: 'false',
            name: 'email',
            placeholder: 'test@test.ru'
        },
        {
            elementClass: 'profile-wrapper-form__element',
            elementType: 'common',
            type: 'text',
            header: 'Логин',
            contenteditable: 'false',
            name: 'login',
            placeholder: 'test'
        },
        {
            elementClass: 'profile-wrapper-form__element',
            elementType: 'common',
            type: 'text',
            header: 'Имя',
            contenteditable: 'false',
            name: 'first_name',
            placeholder: 'Александр'
        },
        {
            elementClass: 'profile-wrapper-form__element',
            elementType: 'common',
            type: 'text',
            header: 'Фамилия',
            contenteditable: 'false',
            name: 'second_name',
            placeholder: 'Мелков'
        },
        {
            elementClass: 'profile-wrapper-form__element',
            elementType: 'common',
            type: 'text',
            header: 'Имя в чате',
            contenteditable: 'false',
            name: 'display_name',
            placeholder: 'Александр'
        },
        {
            elementClass: 'profile-wrapper-form__element',
            elementType: 'common',
            type: 'phone',
            header: 'Телефон',
            contenteditable: 'false',
            name: 'phone',
            placeholder: '8 (999) 999-99-99'
        },
        {
            elementClass: 'profile-wrapper-form__element',
            elementType: 'password',
            type: 'password',
            header: 'Старый пароль',
            contenteditable: 'true',
            name: 'old_password',
            placeholder: 'Старый пароль'
        },
        {
            elementClass: 'profile-wrapper-form__element',
            elementType: 'password',
            type: 'password',
            header: 'Новый пароль',
            contenteditable: 'true',
            name: 'new_password',
            placeholder: 'Новый пароль'
        },
        {
            elementClass: 'profile-wrapper-form__element',
            elementType: 'password',
            type: 'password',
            header: 'Повторите новый пароль',
            contenteditable: 'true',
            name: 'repeat_password',
            placeholder: 'Повторите новый пароль'
        },
    ],
    password:{
        old_password:'',
        new_password:'',
        repeat_password:'',
    },
    events: [
        {
            type: 'focusout',
            callback: function (event:Event) {
                const input:HTMLDivElement|null = (event.target as HTMLElement).closest('div[contenteditable="true"]');
                if (!input) {
                    return;
                }
                const parent = <HTMLElement>input.closest('.profile-wrapper-form__element');
                if (!parent) {
                    return;
                }
                if (input.textContent&&input.textContent!==''&&Validator.validate(input,<string>input.getAttribute('name'))) {
                    let content;
                    if (input.textContent.match(/·/)) {
                        content = profileFormController.password[<string>input.getAttribute('name')]
                    } else {
                        content = input.textContent;
                    }
                    eventBus.emit(GLOBAL_EVENTS.PROFILE_SAVE_POSSIBILITY,true);
                    eventBus.emit(GLOBAL_EVENTS.PROFILE_DATA,parent.getAttribute('type'),input.getAttribute('name'),content);
                } else {
                    parent.style.borderColor = 'red';
                    eventBus.emit(GLOBAL_EVENTS.PROFILE_SAVE_POSSIBILITY,false);
                }

            }
        },
        {
            type: 'focusin',
            callback: function (event:Event) {
                let input:HTMLDivElement|null = (event.target as HTMLElement).closest('div[contenteditable="true"]');
                if (!input) {
                    return;
                }
                (input.closest('.profile-wrapper-form__element') as HTMLElement).style.borderColor = '#CECECE';
                console.log(`Поле ${input.getAttribute('name')} получило фокус`)
            }
        },
        {
            type: 'input',
            callback: function (event:Event) {
                const element = (event.target as HTMLElement);
                if (!element) {
                    return;
                }
                const input = (event.target as HTMLElement).closest('div[contenteditable="true"]');
                if (input&&input.getAttribute('type')==='password') {
                    profileFormController.password[<string>element.getAttribute('name')] += element.innerText.substring(0,1);
                    let dots = '';
                    for (let i=0;i<element.innerText.length;i++) {
                        dots+='·';
                    }
                    element.innerText = dots;
                }
            }
        }
    ],
}