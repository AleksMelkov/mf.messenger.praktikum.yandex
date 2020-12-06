export const profileController = {
    class: 'chats-wrapper__header-btn',
    event: {
        type: 'click',
        callback: function (event) {
            console.log('Получаем данные по профилю пользователя');
            globalEventBus.emit(GLOBAL_EVENTS.PROFILE);
        }
    }

}