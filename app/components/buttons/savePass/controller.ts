import { ControllerType } from '../../controllerType';
import Store from '../../../Store';
import { SaveUserPassApi } from '../../../api/saveUserApi';
import Router from '../../../Router';
import { ROUTE_LIST } from '../../../routes/routeList';

const savePass = new SaveUserPassApi('/user');
const router = new Router();

export const savePassController:ControllerType = {
  parent: {
    class: 'profile-wrapper-form__element',
  },
  methods: {

  },
  events: [
    {
      type: 'click',
      callback() {
        const store = new Store();
        const passwords = store.value.password;
        if (passwords.new_password !== passwords.repeat_password) {
          const elementInput = document.querySelector('.profile-wrapper-form__element-input[name="repeat_password"]');
          if (!elementInput) {
            return;
          }
          const formElement = <HTMLElement|null>elementInput.closest('.profile-wrapper-form__element');
          if (formElement) formElement.style.borderColor = 'red';
        } else {
          const data = {
            oldPassword: passwords.old_password,
            newPassword: passwords.new_password,
          };
          savePass.update(data).then((res) => {
            if (res.status >= 200 && res.status < 299) {
              const elementInput = document.querySelector('.profile-wrapper-form__element-input[name="repeat_password"]');
              if (!elementInput) {
                return;
              }
              const formElement = <HTMLElement|null>elementInput.closest('.profile-wrapper-form__element');
              if (formElement) formElement.style.borderColor = 'rgb(206, 206, 206)';
              const hideElements:NodeList = document.querySelectorAll('.profile-wrapper-form__element[type="common"]');
              Array.from(hideElements).forEach((item:HTMLElement) => {
                if (!item.classList.contains('profile-wrapper-form__element_save')) {
                  item.style.display = 'flex';
                }
              });
              const showElements = document.querySelectorAll('.profile-wrapper-form__element[type="password"]');
              Array.from(showElements).forEach((item:HTMLElement) => {
                item.style.display = 'none';
                const input = item.querySelector('.profile-wrapper-form__element-input');
                if (!input) {
                  return;
                }
                input.textContent = '';
              });
              store.dispatch({
                type: 'REMOVE_PASSWORDS',
                payload: {
                  old_password: '',
                  new_password: '',
                  repeat_password: '',
                },
              });
            }
          }).catch(() => {
            router.go(ROUTE_LIST.SERVER_ERROR);
          });
        }
      },
    },
  ],
};
