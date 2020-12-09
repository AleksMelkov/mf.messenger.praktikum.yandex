import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS } from "../../../GlobalEvents.js";

const eventBus = new EventBus();

export const savePassController = {
    parent: {
        class: 'profile-wrapper-form__element',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                console.log('Сохраняем новый пароль')
                eventBus.emit(GLOBAL_EVENTS.SAVE_PASS);
            }
        }
    ]
}