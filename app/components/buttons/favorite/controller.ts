import { ControllerType } from '../../controllerType';

export const favoriteController:ControllerType = {
  parent: {
    class: 'chats-wrapper__header-btn',
  },
  events: [
    {
      type: 'click',
      callback(event:Event) {
        const block = <HTMLElement>event.target;
        const button = block.closest(`.${favoriteController.parent.class}`);
        // let eventType:string;
        if (button) {
          if (button.classList.contains('chats-wrapper__header-btn-active')) {
            // eventType = 'hide';
          } else {
            // eventType = 'show';
          }
          button.classList.toggle('chats-wrapper__header-btn-active');
        }
      },
    },
  ],
};
