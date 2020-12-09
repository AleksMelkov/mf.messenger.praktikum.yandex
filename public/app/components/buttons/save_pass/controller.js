import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS } from "../../../GlobalEvents.js";
var eventBus = new EventBus();
export var savePassController = {
    parent: {
        class: 'profile-wrapper-form__element',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                console.log('Сохраняем новый пароль');
                eventBus.emit(GLOBAL_EVENTS.SAVE_PASS);
            }
        }
    ]
};
//# sourceMappingURL=controller.js.map