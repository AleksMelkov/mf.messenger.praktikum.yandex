export const changeProfileController = {
    class: 'profile-wrapper-form__element',
    event: {
        type: 'click',
        callback: function () {
            console.log('Изменить данные')
            globalEventBus.emit(GLOBAL_EVENTS.PROFILE_CHANGE);
        }
    }
}