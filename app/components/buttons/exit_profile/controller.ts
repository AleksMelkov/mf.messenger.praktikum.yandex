export const exitProfileController = {
    parent: {
        class: 'profile-wrapper-form__element',
    },

    events: [
        {
            type: 'click',
            callback: function () {
                console.log('Выйти из профиля')
            }
        }
    ]
}