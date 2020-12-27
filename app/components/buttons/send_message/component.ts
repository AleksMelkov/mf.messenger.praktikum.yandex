export const sendMessageController = {
    parent: {
        class: 'bottom-panel__message-send',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                console.log('Отправить сообщение')
            }
        }
    ]
}