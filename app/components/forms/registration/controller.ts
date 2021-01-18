import { ControllerType } from '../../controllerType';
import Validator from '../../../Validator';
import { AuthSignup } from '../../../api/authApi';
import Router from '../../../Router';

import { ROUTE_LIST } from '../../../routes/routeList';

const authSignup = new AuthSignup('/auth');
const router = new Router();

export const registrationController:ControllerType = {
  parent: {
    name: 'form',
    class: 'auth-window',
  },
  header: {
    class: 'register-window__title',
    text: 'Регистрация',
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
    class: 'register-window-btnArea',
  },
  data: {
    email: '',
    login: '',
    first_name: '',
    second_name: '',
    password: '',
    repeat_password: '',
  },
  methods: {
    submitForm(event:Event) {
      const target = <HTMLFormElement>event.target;
      const form = target.closest('form');
      if (!form) {
        return;
      }
      let submitError = false;
      if (!registrationController.data) {
        return;
      }
      Object.entries(registrationController.data).forEach(([key, item]) => {
        if ((item !== '' && !Validator.validate(<string>item, key)) || item === '') {
          submitError = true;
          const input = <HTMLInputElement|null>form.querySelector(`input[name="${key}"]`);
          if (!input) {
            return;
          }
          const field = input.closest('.auth-window-field');
          if (!field) {
            return;
          }
          const fieldError = <HTMLElement|null>field.querySelector('.auth-window-field__error');
          if (fieldError) fieldError.style.opacity = '1';
        }
      });
      if (registrationController.data.password !== registrationController.data.repeat_password) {
        submitError = true;
        const input = <HTMLInputElement|null>form.querySelector('input[type="repeat_password"]');
        if (!input) {
          return;
        }
        const field = input.closest('.auth-window-field');
        if (!field) {
          return;
        }
        const fieldError = <HTMLElement|null>field.querySelector('.auth-window-field__error');
        if (fieldError) fieldError.style.opacity = '1';
      }
      if (!submitError && registrationController.methods) {
        registrationController.methods.registerUser();
      }
    },
    registerUser() {
      if (!registrationController.data) {
        return;
      }
      const data = {
        first_name: registrationController.data.first_name,
        second_name: registrationController.data.second_name,
        login: registrationController.data.login,
        email: registrationController.data.email,
        password: registrationController.data.password,
        phone: '+79009009090',
      };
      authSignup.create(data).then((res) => {
        if (res.status !== 200) {
          if (!registrationController.buttonBlock) {
            return;
          }
          const buttonBlock = document.querySelector(`.${registrationController.buttonBlock.class}`);
          let errorBlock = document.querySelector('.auth-window-btnArea__error');
          if (!errorBlock) {
            errorBlock = document.createElement('div');
            if (!errorBlock) {
              return;
            }
            errorBlock.classList.add('auth-window-btnArea__error');
          }
          if (buttonBlock) buttonBlock.prepend(errorBlock);
          errorBlock.textContent = JSON.parse(res.responseText).reason;
        } else {
          router.go(ROUTE_LIST.CHATS);
        }
      }).catch(() => {
        router.go(ROUTE_LIST.SERVER_ERROR);
      });
    },
  },
  events: [
    {
      type: 'submit',
      callback(event:Event) {
        event.preventDefault();
        if (registrationController.methods) registrationController.methods.submitForm(event);
      },
    },
    {
      type: 'focusout',
      callback(event:Event) {
        const target = <HTMLElement>event.target;
        const input = target.closest('input');
        if (!input) {
          return;
        }
        const field = input.closest('.auth-window-field');
        if (!field) {
          return;
        }
        const header = field.querySelector('.auth-window-field__title');
        if (!header) {
          return;
        }
        const error = <HTMLElement|null>field.querySelector('.auth-window-field__error');
        if (!error) {
          return;
        }
        if (!registrationController.data) {
          return;
        }
        if (input.value === '') {
          header.classList.remove('auth-window-field__title-show');
          header.classList.add('auth-window-field__title-hide');
          setTimeout(() => {
            header.classList.remove('auth-window-field__title-hide');
            if (!input) {
              return;
            }
            input.placeholder = <string>header.textContent;
          }, 300);
          registrationController.data[<string>input.name] = '';
        }
        if (input.value !== '' && Validator.validate(input, input.name)) {
          registrationController.data[input.name] = input.value;
        } else if (input.value !== '') {
          error.style.opacity = '1';
        }
      },
    },
    {
      type: 'focusin',
      callback(event:Event) {
        const target = <HTMLElement>event.target;
        const input = target.closest('input');
        if (!input) {
          return;
        }
        const field = input.closest('.auth-window-field');
        if (!field) {
          return;
        }
        const header = field.querySelector('.auth-window-field__title');
        if (!header) {
          return;
        }
        const error = <HTMLElement|null>field.querySelector('.auth-window-field__error');
        if (!error) {
          return;
        }
        input.placeholder = '';
        header.classList.add('auth-window-field__title-show');
        error.style.opacity = '0';
      },
    },
  ],
};
