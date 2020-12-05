export const registrationController = {
    parentTag: {
        name: 'form',
        class: 'auth-window',
    },
    header: {
        class: 'auth-window__title',
        text: 'Регистрация'
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
            header: 'Логин',
            type: 'text',
            name: 'login',
            placeholder: 'Логин',
            errorText: 'Неверный Логин',
        },
        {
            elementClass: 'auth-window-field',
            header: 'Имя',
            type: 'text',
            name: 'name',
            placeholder: 'Имя',
            errorText: '',
        },
        {
            elementClass: 'auth-window-field',
            header: 'Фамилия',
            type: 'text',
            name: 'surname',
            placeholder: 'Фамилия',
            errorText: '',
        },
        {
            elementClass: 'auth-window-field',
            header: 'Пароль',
            type: 'password',
            name: 'password',
            placeholder: 'Пароль',
            errorText: 'Неверный пароль',
        },
        {
            elementClass: 'auth-window-field',
            header: 'Повторите пароль',
            type: 'password',
            name: 'repeat_password',
            placeholder: 'Повторите пароль',
            errorText: 'Пароли не совпадают',
        },
    ],
    buttonBlock: {
        class: 'register-window-btnArea'
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