import { ControllerType } from "../../controllerType.js";

export const messageInputController:ControllerType = {
    parent:{
        class: 'contenteditable',
    },
    events: [
        {
            type: 'input',
            callback: function (event:Event) {
                const target = <HTMLElement>event.target;
                const input = <HTMLElement|null>target.closest(`.${messageInputController.parent.class}`);
                if (!input) {
                    return;
                }
                if (input.textContent&&input.textContent.length>0) {
                    input.classList.add('contenteditable_active');
                    input.dataset.placeholder = "";
                } else {
                    input.classList.remove('contenteditable_active');
                    input.dataset.placeholder = "Сообщение";
                }
                console.log('Открыть список доступных к загрузке приложений')
            }
        }
    ]
}