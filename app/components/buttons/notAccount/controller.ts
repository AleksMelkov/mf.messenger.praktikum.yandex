import { ControllerType } from '../../controllerType';
import Router from '../../../Router';
import { ROUTE_LIST } from '../../../routes/routeList';

const router = new Router();

export const notAccountController:ControllerType = {
  parent: {
    class: 'auth-window-btnArea__smallBtn',
    text: 'Нет аккаунта?',
  },
  events: [
    {
      type: 'click',
      callback() {
        router.go(ROUTE_LIST.REGISTER);
      },
    },
  ],
};
