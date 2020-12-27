export const uploadAttachController = {
    parent: {
        class: 'bottom-panel__file-upload',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                console.log('Открыть список доступных к загрузке приложений')
            }
        }
    ]
}