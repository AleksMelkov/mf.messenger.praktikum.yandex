export const chatSettingsController = {
    parentTag: {
        name: 'ul',
        class: 'header-dropdown__list',
    },
    elementClass:'dropdown__element',
    elements:[
        {
            class: 'header-dropdown__element',
            name: 'Добавить пользователя',
            type: 'add_user',
        },
        {
            class: 'header-dropdown__element',
            name: 'Удалить пользователя',
            type: 'remove_user',
        },
    ],
    elementClick: {
        type: 'click',
        callback: function (event) {
            const button = event.target.closest('.header-dropdown__element');
            console.log(button.dataset.type);
        }
    }
}