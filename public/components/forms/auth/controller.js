export const authController = {
    parentTag: {
        name: 'form',
        class: 'auth-window',
    },
    header: {
        class: 'auth-window__title',
        text: 'Авторизация'
    },
    fields: [
        {
            elementClass: 'auth-window-field',
            header: 'Почта',
            type: 'text',
            name: 'email',
            placeholder: 'Почта',
            errorText: 'Неверная почта',
        },
        {
            elementClass: 'auth-window-field',
            header: 'Пароль',
            type: 'password',
            name: 'password',
            placeholder: 'Пароль',
            errorText: 'Неверный пароль',
        },
    ],
    buttonBlock: {
        class: 'auth-window-btnArea'
    },
    formEvents: [
        {
            type: 'submit',
            callback: function (event) {
                console.log('submit')
            }
        },
        {
            type: 'focusout',
            callback: function (event) {
                let input = event.target.closest('input')
                console.log(`Поле ${input.name} потеряло фокус`)
            }
        },
        {
            type: 'focusin',
            callback: function (event) {
                let input = event.target.closest('input')
                console.log(`Поле ${input.name} получило фокус`)
            }
        },
    ],
}