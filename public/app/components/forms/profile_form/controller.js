import Validator from "../../../Validator.js";
import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS } from "../../../GlobalEvents.js";
var eventBus = new EventBus();
export var profileFormController = {
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
    password: {
        old_password: '',
        new_password: '',
        repeat_password: '',
    },
    events: [
        {
            type: 'focusout',
            callback: function (event) {
                var input = event.target.closest('div[contenteditable="true"]');
                if (!input) {
                    return;
                }
                var parent = input.closest('.profile-wrapper-form__element');
                if (!parent) {
                    return;
                }
                if (input.textContent && input.textContent !== '' && Validator.validate(input, input.getAttribute('name'))) {
                    var content = void 0;
                    if (input.textContent.match(/·/)) {
                        content = profileFormController.password[input.getAttribute('name')];
                    }
                    else {
                        content = input.textContent;
                    }
                    eventBus.emit(GLOBAL_EVENTS.PROFILE_SAVE_POSSIBILITY, true);
                    eventBus.emit(GLOBAL_EVENTS.PROFILE_DATA, parent.getAttribute('type'), input.getAttribute('name'), content);
                }
                else {
                    parent.style.borderColor = 'red';
                    eventBus.emit(GLOBAL_EVENTS.PROFILE_SAVE_POSSIBILITY, false);
                }
            }
        },
        {
            type: 'focusin',
            callback: function (event) {
                var input = event.target.closest('div[contenteditable="true"]');
                if (!input) {
                    return;
                }
                input.closest('.profile-wrapper-form__element').style.borderColor = '#CECECE';
                console.log("\u041F\u043E\u043B\u0435 " + input.getAttribute('name') + " \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E \u0444\u043E\u043A\u0443\u0441");
            }
        },
        {
            type: 'input',
            callback: function (event) {
                var element = event.target;
                if (!element) {
                    return;
                }
                var input = event.target.closest('div[contenteditable="true"]');
                if (input && input.getAttribute('type') === 'password') {
                    profileFormController.password[element.getAttribute('name')] += element.innerText.substring(0, 1);
                    var dots = '';
                    for (var i = 0; i < element.innerText.length; i++) {
                        dots += '·';
                    }
                    element.innerText = dots;
                }
            }
        }
    ],
};
//# sourceMappingURL=controller.js.map