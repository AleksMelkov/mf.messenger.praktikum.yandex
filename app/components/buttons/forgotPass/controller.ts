import { ControllerType } from "../../controllerType.js";

export const forgotPassController:ControllerType = {
    parent: {
        class: 'auth-window-btnArea__smallBtn',
        text: 'Забыли пароль?',
    },
    events: [
        {
            type: 'click',
            callback: function () {

            }
        }
    ]
}