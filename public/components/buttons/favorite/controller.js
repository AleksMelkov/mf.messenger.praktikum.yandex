export const favoriteController = {
    class: 'chats-wrapper__header-btn',
    event: {
        type: 'click',
        callback: function (event) {
            const button = event.target.closest(`.${favoriteController.class}`);
            let eventType;
            if (button.classList.contains('chats-wrapper__header-btn-active')) {
                console.log('Открываем скрытые чаты');
                eventType = 'hide';
            } else {
                console.log('Получаем идентификатор чата с избранными сообщениями');
                eventType = 'show';
            }
            button.classList.toggle('chats-wrapper__header-btn-active');
            globalEventBus.emit(GLOBAL_EVENTS.FAVORITE,{type:eventType,chat_id:'d35emt0mj1bp'});
        }
    }
}