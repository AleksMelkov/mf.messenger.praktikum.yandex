import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS } from "../../../GlobalEvents.js";
var eventBus = new EventBus();
export var favoriteController = {
    parent: {
        class: 'chats-wrapper__header-btn',
    },
    events: [
        {
            type: 'click',
            callback: function (event) {
                var block = event.target;
                var button = block.closest("." + favoriteController.parent.class);
                var eventType;
                if (button) {
                    if (button.classList.contains('chats-wrapper__header-btn-active')) {
                        console.log('Открываем скрытые чаты');
                        eventType = 'hide';
                    }
                    else {
                        console.log('Получаем идентификатор чата с избранными сообщениями');
                        eventType = 'show';
                    }
                    button.classList.toggle('chats-wrapper__header-btn-active');
                    eventBus.emit(GLOBAL_EVENTS.FAVORITE, { type: eventType, chat_id: 'd35emt0mj1bp' });
                }
            }
        }
    ]
};
//# sourceMappingURL=controller.js.map