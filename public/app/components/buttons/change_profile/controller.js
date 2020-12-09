import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS } from "../../../GlobalEvents.js";
var eventBus = new EventBus();
export var changeProfileController = {
    parent: {
        class: 'profile-wrapper-form__element',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                console.log('Изменить данные');
                eventBus.emit(GLOBAL_EVENTS.PROFILE_CHANGE);
            }
        }
    ]
};
//# sourceMappingURL=controller.js.map