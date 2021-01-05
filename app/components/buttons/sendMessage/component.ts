import { ControllerType } from "../../controllerType.js";

export const sendMessageController:ControllerType = {
    parent: {
        class: 'bottom-panel__message-send',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                console.log('Отправить сообщение')
            }
        }
    ]
}