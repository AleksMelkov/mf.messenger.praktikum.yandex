import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS } from "../../../GlobalEvents.js";

const eventBus = new EventBus();

export const profileController = {
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
}