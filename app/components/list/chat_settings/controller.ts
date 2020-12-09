export const chatSettingsController = {
    parent: {
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
    events: [
        {
            type: 'click',
            callback: function (event:Event) {
                const button:HTMLElement|null = (event.target as HTMLElement).closest('.header-dropdown__element');
                if (!button) {
                    return;
                }
                console.log(button.dataset.type);
            }
        }
    ]
}