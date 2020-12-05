export const savePassController = {
    class: 'profile-wrapper-form__element',
    event: {
        type: 'click',
        callback: function () {
            console.log('Сохраняем новый пароль')
            globalEventBus.emit(GLOBAL_EVENTS.SAVE_PASS);
        }
    }
}