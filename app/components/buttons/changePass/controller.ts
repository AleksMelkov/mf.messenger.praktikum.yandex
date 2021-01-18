import { ControllerType } from '../../controllerType';

export const changePassController:ControllerType = {
  parent: {
    class: 'profile-wrapper-form__element',
  },
  events: [
    {
      type: 'click',
      callback() {
        const hideElements = document.querySelectorAll('.profile-wrapper-form__element[type="common"]');
        Array.from(hideElements).forEach((item:HTMLElement) => {
          item.style.display = 'none';
        });
        const showElements = document.querySelectorAll('.profile-wrapper-form__element[type="password"]');
        Array.from(showElements).forEach((item:HTMLElement) => {
          item.style.display = 'flex';
        });
        const btnSave:HTMLElement|null = document.querySelector('.profile-wrapper-form__element_save');
        if (btnSave) {
          btnSave.style.display = 'none';
        }
      },
    },
  ],
};
