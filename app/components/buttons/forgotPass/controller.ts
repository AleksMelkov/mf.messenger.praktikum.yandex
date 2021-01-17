import { ControllerType } from "../../controllerType";

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