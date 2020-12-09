import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS } from "../../../GlobalEvents.js";

const eventBus = new EventBus();

export const uploadAttachController = {
    parent: {
        class: 'bottom-panel__file-upload',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                console.log('Открыть список доступных к загрузке приложений')
                eventBus.emit(GLOBAL_EVENTS.UPLOAD_ATTACH)
            }
        }
    ]
}