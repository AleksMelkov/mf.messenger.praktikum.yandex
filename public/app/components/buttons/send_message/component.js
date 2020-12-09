import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS } from "../../../GlobalEvents.js";
var eventBus = new EventBus();
export var sendMessageController = {
    parent: {
        class: 'bottom-panel__message-send',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                console.log('Отправить сообщение');
                eventBus.emit(GLOBAL_EVENTS.SEND_MESSAGE);
            }
        }
    ]
};
//# sourceMappingURL=component.js.map