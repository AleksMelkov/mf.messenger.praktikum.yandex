import { ControllerType } from '../../controllerType';

export const authSubmitController:ControllerType = {
  parent: {
    class: 'auth-window-btnArea__bigBtn',
    text: 'Войти',
  },
  events: [
    {
      type: 'click',
      callback() {
      },
    },
  ],
};
