export const saveProfileController = {
    parent: {
        class: 'profile-wrapper-form__element',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                console.log('Сохранить данные профиля')
            }
        }
    ]
}