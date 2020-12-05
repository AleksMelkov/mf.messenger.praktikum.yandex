export const changePassController = {
    class: 'profile-wrapper-form__element',
    event: {
        type: 'click',
        callback: function () {
            console.log('Изменить пароль')
            globalEventBus.emit(GLOBAL_EVENTS.PASS_CHANGE);
        }
    }
};