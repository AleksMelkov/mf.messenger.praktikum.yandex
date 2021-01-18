import { ControllerType } from '../../controllerType';
import Router from '../../../Router';
import { ROUTE_LIST } from '../../../routes/routeList';

const router = new Router();

export const profileController:ControllerType = {
  parent: {
    class: 'chats-wrapper__header-btn',
  },
  events: [
    {
      type: 'click',
      callback() {
        const controlPanel = document.querySelector('.chats-wrapper__control-panel');
        if (controlPanel) controlPanel.remove();
        const searchPanel = document.querySelector('.chats-wrapper__search-panel');
        if (searchPanel) searchPanel.remove();
        router.go(ROUTE_LIST.PROFILE);
      },
    },
  ],
};
