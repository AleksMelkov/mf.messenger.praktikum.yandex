import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS } from "../../../GlobalEvents.js";
var eventBus = new EventBus();
export var saveProfileController = {
    parent: {
        class: 'profile-wrapper-form__element',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                console.log('Сохранить данные профиля');
                eventBus.emit(GLOBAL_EVENTS.SAVE_PROFILE);
            }
        }
    ]
};
//# sourceMappingURL=controller.js.map