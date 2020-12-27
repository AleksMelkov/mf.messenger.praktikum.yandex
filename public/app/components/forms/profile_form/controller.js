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
import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS } from "../../../GlobalEvents.js";
import Store from "../../../Store.js";
import { getArrayElement } from "../../../utils/getArrayElement.js";
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
    store: new Store(),
    mount: function () {
        eventBus.on(GLOBAL_EVENTS.SAVE_PROFILE, profileFormController.methods.submitProfile.bind(profileFormController));
        profileFormController.methods.getUserInfo();
    },
    methods: {
        submitProfile: function () {
            var error = false;
            Object.entries(this.state.user.common).forEach(function (_a) {
                var _b = __read(_a, 2), key = _b[0], item = _b[1];
                if (!Validator.validate(item, key)) {
                    error = true;
                    document.querySelector(".profile-wrapper-form__element-input[name=\"" + key + "\"]")
                        .closest('.profile-wrapper-form__element[type="common"]')
                        .style.borderColor = 'red';
                }
            });
            if (!error && this.state.formSavePossibility) {
                var fields = document.querySelectorAll('.profile-wrapper-form__element[type="common"]');
                fields.forEach(function (item) {
                    if (item.classList.contains('profile-wrapper-form__element_hide'))
                        item.style.display = 'flex';
                    if (!item.classList.contains('profile-wrapper-form__element_hide') &&
                        !item.classList.contains('profile-wrapper-form__element_save'))
                        item.querySelector('.profile-wrapper-form__element-input').setAttribute('contenteditable', 'false');
                    if (item.classList.contains('profile-wrapper-form__element_save'))
                        item.style.display = 'none';
                });
                console.log(this.state.user.common);
            }
        },
        getUserInfo: function () {
            var store = new Store();
            Object.keys(store.value.user).forEach(function (key) {
                var element = getArrayElement(profileFormController.elements, 'name', key)[0];
                if (element)
                    element.placeholder = store.value.user[key];
            });
        },
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
                    if (!input.textContent.match(/·/)) {
                        var name_1 = input.getAttribute('name');
                        profileFormController.user[name_1] = input.textContent;
                    }
                }
                else {
                    parent.style.borderColor = 'red';
                }
                console.log(profileFormController.user);
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