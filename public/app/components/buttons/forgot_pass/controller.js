import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS } from "../../../GlobalEvents.js";
var eventBus = new EventBus();
export var forgotPassController = {
    parent: {
        class: 'auth-window-btnArea__smallBtn',
        text: 'Забыли пароль? (временный переход к чатам)',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                eventBus.emit(GLOBAL_EVENTS.FORGOT_PASS);
            }
        }
    ]
};
//# sourceMappingURL=controller.js.map