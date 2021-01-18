import { ControllerType } from '../../controllerType';

export const uploadAttachController:ControllerType = {
  parent: {
    class: 'bottom-panel__file-upload',
  },
  events: [
    {
      type: 'click',
      callback() {},
    },
  ],
};
