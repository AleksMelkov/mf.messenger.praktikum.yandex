import { ControllerType } from '../../controllerType';

export const chatSettingsComponentButton:ControllerType = {
  parent: {
    class: 'fa-ellipsis-v',
  },
  events: [
    {
      type: 'click',
      callback() {
        const block = document.querySelector('.header-dropdown__block');
        if (block) {
          block.classList.toggle('header-dropdown__block_active');
        }
      },
    },
  ],
};
