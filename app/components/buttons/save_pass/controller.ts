export const savePassController = {
    parent: {
        class: 'profile-wrapper-form__element',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                console.log('Сохраняем новый пароль')
            }
        }
    ]
}