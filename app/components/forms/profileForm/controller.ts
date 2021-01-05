import { ControllerType } from "../../controllerType.js";
import Validator from "../../../Validator.js";
import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS} from "../../../GlobalEvents.js";
import Store from "../../../Store.js";
import { getArrayElement } from "../../../utils/getArrayElement.js";

const eventBus = new EventBus();

export const profileFormController:ControllerType = {
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
    mount() {
        if (!profileFormController.methods) {
            return;
        }
        eventBus.on(GLOBAL_EVENTS.SAVE_PROFILE,profileFormController.methods.submitProfile.bind(profileFormController))
        profileFormController.methods.getUserInfo();
    },
    methods: {
        submitProfile() {
            let error = false;
            Object.entries(this.state.user.common).forEach(([key,item])=>{
                if (!Validator.validate(<string>item,key)) {
                    error = true;
                    const elementInput = document.querySelector(`.profile-wrapper-form__element-input[name="${key}"]`);
                    if (!elementInput) {
                        return;
                    }
                    const formElement = <HTMLElement|null>elementInput.closest('.profile-wrapper-form__element[type="common"]');
                    if (formElement) formElement.style.borderColor = 'red';
                }
            });
            if (!error&&this.state.formSavePossibility) {
                let fields = document.querySelectorAll('.profile-wrapper-form__element[type="common"]');
                fields.forEach((item:HTMLElement)=>{
                    if (item.classList.contains('profile-wrapper-form__element_hide')) item.style.display = 'flex';
                    if (
                        !item.classList.contains('profile-wrapper-form__element_hide') &&
                        !item.classList.contains('profile-wrapper-form__element_save')
                    ) {
                        const element = <HTMLElement|null>item.querySelector('.profile-wrapper-form__element-input');
                        if (element) element.setAttribute('contenteditable','false');
                    }
                    if (item.classList.contains('profile-wrapper-form__element_save')) item.style.display = 'none';
                });
                console.log(this.state.user.common);
            }
        },
        getUserInfo() {
            const store = new Store();

            Object.keys(store.value.user).forEach(key=>{
                if (!profileFormController.elements) {
                    return;
                }
                const element = getArrayElement(profileFormController.elements,'name',key)[0];
                if (element)
                    element.placeholder = store.value.user[key];
            })
        },
    },
    events: [
        {
            type: 'focusout',
            callback: function (event:Event) {
                const store = new Store();
                const target = <HTMLElement>event.target;
                const input = <HTMLDivElement|null>target.closest('div[contenteditable="true"]');
                if (!input) {
                    return;
                }
                const parent = <HTMLElement>input.closest('.profile-wrapper-form__element');
                if (!parent) {
                    return;
                }
                if (input.textContent&&input.textContent!==''&&Validator.validate(input,<string>input.getAttribute('name'))) {
                    if (!input.textContent.match(/·/)) {
                        const name = input.getAttribute('name');
                        store.dispatch({
                            type:'GET_USER_INFO',
                            payload:{[<string>name]:input.textContent}
                        });
                    }
                } else {
                    parent.style.borderColor = 'red';
                }
            }
        },
        {
            type: 'focusin',
            callback: function (event:Event) {
                const target = <HTMLElement>event.target;
                let input = <HTMLDivElement|null>target.closest('div[contenteditable="true"]');
                if (!input) {
                    return;
                }
                const formElement = <HTMLElement|null>input.closest('.profile-wrapper-form__element');
                if (formElement) formElement.style.borderColor = '#CECECE';
            }
        },
        {
            type: 'input',
            callback: function (event:Event) {
                const element = <HTMLElement>event.target;
                if (!element) {
                    return;
                }
                const input = element.closest('div[contenteditable="true"]');
                const store = new Store();
                if (input&&input.getAttribute('name')==='display_name') {
                    const headerName = document.querySelector('.profile-wrapper__name');
                    if (!headerName) {
                        return;
                    }
                    if (element.innerText.length>0) {
                        headerName.textContent = element.innerText;
                    } else {
                        headerName.textContent = store.value.user.display_name;
                    }
                }
                if (input&&input.getAttribute('type')==='password') {
                    if (element.innerText.length>0) {
                        store.dispatch({
                            type:'UPDATE_PASSWORD',
                            payload:{
                                [<string>element.getAttribute('name')]: element.innerText.substring(0,1)
                            }
                        });
                    } else {
                        store.dispatch({
                            type:'REMOVE_PASSWORDS',
                            payload: {
                                [<string>element.getAttribute('name')]:''
                            }
                        });
                    }
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