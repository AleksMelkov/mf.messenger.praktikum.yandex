import { ControllerType } from "../../controllerType.js";

export const uploadAttachController:ControllerType = {
    parent: {
        class: 'bottom-panel__file-upload',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                console.log('Открыть список доступных к загрузке приложений')
            }
        }
    ]
}