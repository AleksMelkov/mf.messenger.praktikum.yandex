import { ControllerType } from "../../controllerType.js";

export const chatSettingsComponentButton:ControllerType = {
    parent: {
        class: 'fa-ellipsis-v',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                const block = document.querySelector('.header-dropdown__block');
                if (block) {
                    block.classList.toggle('header-dropdown__block_active');
                }
            }
        }
    ]
}