import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS } from "../../../GlobalEvents.js";
var eventBus = new EventBus();
export var profileController = {
    parent: {
        class: 'chats-wrapper__header-btn',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                console.log('Получаем данные по профилю пользователя');
                eventBus.emit(GLOBAL_EVENTS.PROFILE);
            }
        }
    ]
};
//# sourceMappingURL=controller.js.map