import { ControllerType } from "../../controllerType";
import EventBus from "../../../EventBus";
import { GLOBAL_EVENTS } from "../../../GlobalEvents";

const eventBus = new EventBus();

export const sendMessageController:ControllerType = {
    parent: {
        class: 'bottom-panel__message-send',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                eventBus.emit(GLOBAL_EVENTS.SEND_MESSAGE_CLICK);
            }
        }
    ]
}