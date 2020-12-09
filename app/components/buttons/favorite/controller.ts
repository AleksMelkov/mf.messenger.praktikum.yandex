import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS } from "../../../GlobalEvents.js";

const eventBus = new EventBus();

export const favoriteController = {
    parent: {
        class: 'chats-wrapper__header-btn',
    },
    events: [
        {
            type: 'click',
            callback: function (event:Event) {
                const block = <HTMLElement>event.target
                const button = block.closest(`.${favoriteController.parent.class}`);
                let eventType:string;
                if (button) {
                    if (button.classList.contains('chats-wrapper__header-btn-active')) {
                        console.log('Открываем скрытые чаты');
                        eventType = 'hide';
                    } else {
                        console.log('Получаем идентификатор чата с избранными сообщениями');
                        eventType = 'show';
                    }
                    button.classList.toggle('chats-wrapper__header-btn-active');
                    eventBus.emit(GLOBAL_EVENTS.FAVORITE,{type:eventType,chat_id:'d35emt0mj1bp'});
                }

            }
        }
    ]
}