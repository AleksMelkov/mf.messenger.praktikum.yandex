export const uploadAttachController = {
    class: 'bottom-panel__file-upload',
    event: {
        type: 'click',
        callback: function () {
            console.log('Открыть список доступных к загрузке приложений')
            globalEventBus.emit(GLOBAL_EVENTS.UPLOAD_ATTACH)
        }
    }
}