import { ControllerType } from '../../controllerType';

export const chatSettingsController:ControllerType = {
  parent: {
    name: 'ul',
    class: 'header-dropdown__list',
  },
  elementClass: 'dropdown__element',
  elements: [
    // {
    //     class: 'header-dropdown__element',
    //     name: 'Добавить пользователя',
    //     type: 'add_user',
    // },
    {
      class: 'header-dropdown__element',
      name: 'Удалить пользователя',
      type: 'remove_user',
    },
  ],
  events: [
    {
      type: 'click',
      callback(event:Event) {
        const target = <HTMLElement>event.target;
        const button = <HTMLElement|null>target.closest('.header-dropdown__element');
        if (!button) {
          return false;
        }
        return true;
      },
    },
  ],
};
