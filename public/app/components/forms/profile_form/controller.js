import Validator from "../../../Validator.js";

export const profileFormController = {
    parentTag: {
        name: 'div',
        class: 'profile-wrapper-form',
    },
    fields: [
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
    formEvents: [
        {
            type: 'focusout',
            callback: function (event) {
                const input = event.target.closest('div[contenteditable="true"]');
                if (input) {
                    const parent = input.closest('.profile-wrapper-form__element');
                    if (input.textContent!==''&&Validator.validate(input,input.getAttribute('name'))) {
                        let content;
                        if (input.textContent.match(/·/)) {
                            content = profileFormController.password[input.getAttribute('name')]
                        } else {
                            content = input.textContent;
                        }
                        globalEventBus.emit(GLOBAL_EVENTS.PROFILE_DATA,parent.getAttribute('type'),input.getAttribute('name'),content);
                    } else {
                        parent.style.borderColor = 'red';
                    }
                }
            }
        },
        {
            type: 'focusin',
            callback: function (event) {
                let input = event.target.closest('div[contenteditable="true"]');
                if (input) {
                    input.closest('.profile-wrapper-form__element').style.borderColor = '#CECECE';
                    console.log(`Поле ${input.getAttribute('name')} получило фокус`)
                }
            }
        },
        {
            type: 'input',
            callback: function (event) {
                let input = event.target.closest('div[contenteditable="true"]');
                if (input&&input.getAttribute('type')==='password') {
                    profileFormController.password[event.target.getAttribute('name')] += event.target.innerText.substring(0,1);
                    let dots = '';
                    for (let i=0;i<event.target.innerText.length;i++) {
                        dots+='·';
                    }
                    event.target.innerText = dots;
                }
            }
        }
    ],
}