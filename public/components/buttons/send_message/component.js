export const sendMessageController = {
    class: 'bottom-panel__message-send',
    event: {
        type: 'click',
        callback: function () {
            console.log('Отправить сообщение')
            globalEventBus.emit(GLOBAL_EVENTS.SEND_MESSAGE)
        }
    }
}