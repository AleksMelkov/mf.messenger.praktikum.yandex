import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS } from "../../../GlobalEvents.js";

const eventBus = new EventBus();

export const profileReturnController = {
    parent: {
        class: 'profile-wrapper__return',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                eventBus.emit(GLOBAL_EVENTS.PROFILE_RETURN)
            }
        }
    ]
}