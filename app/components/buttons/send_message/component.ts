import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS } from "../../../GlobalEvents.js";

const eventBus = new EventBus();

export const sendMessageController = {
    parent: {
        class: 'bottom-panel__message-send',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                console.log('Отправить сообщение')
                eventBus.emit(GLOBAL_EVENTS.SEND_MESSAGE)
            }
        }
    ]
}