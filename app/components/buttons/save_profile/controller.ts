import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS } from "../../../GlobalEvents.js";

const eventBus = new EventBus();

export const saveProfileController = {
    parent: {
        class: 'profile-wrapper-form__element',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                console.log('Сохранить данные профиля')
                eventBus.emit(GLOBAL_EVENTS.SAVE_PROFILE);
            }
        }
    ]
}