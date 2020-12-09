import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS } from "../../../GlobalEvents.js";
var eventBus = new EventBus();
export var notAccountController = {
    parent: {
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
};
//# sourceMappingURL=controller.js.map