import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS } from "../../../GlobalEvents.js";

const eventBus = new EventBus();

export const changePassController = {
    parent: {
        class: 'profile-wrapper-form__element',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                eventBus.emit(GLOBAL_EVENTS.PASS_CHANGE);
            }
        }
    ]
};