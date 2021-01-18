import { ControllerType } from '../../controllerType';
import Validator from '../../../Validator';
import Store from '../../../Store';
import { SaveUserProfileApi } from '../../../api/saveUserApi';
import Router from '../../../Router';
import { ROUTE_LIST } from '../../../routes/routeList';

const saveProfile = new SaveUserProfileApi('/user');
const router = new Router();

export const saveProfileController:ControllerType = {
  parent: {
    class: 'profile-wrapper-form__element',
  },
  events: [
    {
      type: 'click',
      callback() {
        const store = new Store();
        if (!store.value.user) {
          return false;
        }
        let error = false;
        const data = {
          first_name: store.value.user.first_name,
          second_name: store.value.user.second_name,
          display_name: store.value.user.display_name,
          login: store.value.user.login,
          email: store.value.user.email,
          phone: store.value.user.phone,
        };
        Object.entries(data).forEach(([key, item]) => {
          if (!Validator.validate(<string>item, key)) {
            error = true;
            const elementInput = document.querySelector(`.profile-wrapper-form__element-input[name="${key}"]`);
            if (!elementInput) {
              return;
            }
            const formElement = <HTMLElement|null>elementInput.closest('.profile-wrapper-form__element[type="common"]');
            if (formElement) formElement.style.borderColor = 'red';
          }
        });
        if (!error) {
          saveProfile.update(data)
            .then((res) => {
              if (res.status >= 200 && res.status < 299) {
                const fields = document.querySelectorAll('.profile-wrapper-form__element[type="common"]');
                fields.forEach((item:HTMLElement) => {
                  if (item.classList.contains('profile-wrapper-form__element_hide')) item.style.display = 'flex';
                  if (
                    !item.classList.contains('profile-wrapper-form__element_hide')
                                        && !item.classList.contains('profile-wrapper-form__element_save')
                  ) {
                    const element = <HTMLElement|null>item.querySelector('.profile-wrapper-form__element-input');
                    if (element) element.setAttribute('contenteditable', 'false');
                  }
                  if (item.classList.contains('profile-wrapper-form__element_save')) item.style.display = 'none';
                });
              }
            })
            .catch(() => {
              router.go(ROUTE_LIST.SERVER_ERROR);
            });
        }
        return true;
      },
    },
  ],
};
