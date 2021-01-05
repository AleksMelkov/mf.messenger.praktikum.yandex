import { ControllerType } from "../../controllerType.js";

export const chatSettingsController:ControllerType = {
    parent: {
        name: 'ul',
        class: 'header-dropdown__list',
    },
    elementClass:'dropdown__element',
    elements:[
        // {
        //     class: 'header-dropdown__element',
        //     name: 'Добавить пользователя',
        //     type: 'add_user',
        // },
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
                const target = <HTMLElement>event.target;
                const button = <HTMLElement|null>target.closest('.header-dropdown__element');
                if (!button) {
                    return;
                }
                console.log(button.dataset.type);
            }
        }
    ]
}