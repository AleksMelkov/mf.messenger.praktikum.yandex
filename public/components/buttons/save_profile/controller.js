export const saveProfileController = {
    class: 'profile-wrapper-form__element',
    event: {
        type: 'click',
        callback: function () {
            console.log('Сохранить данные профиля')
            globalEventBus.emit(GLOBAL_EVENTS.SAVE_PROFILE);
        }
    }
}