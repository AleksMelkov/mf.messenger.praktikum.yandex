import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS } from "../../../GlobalEvents.js";

const eventBus = new EventBus();

export const notAccountController = {
    parent:{
        class: 'auth-window-btnArea__smallBtn',
        text: 'Нет аккаунта?',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                eventBus.emit(GLOBAL_EVENTS.TO_REGISTRATION);
            }
        }
    ]
}