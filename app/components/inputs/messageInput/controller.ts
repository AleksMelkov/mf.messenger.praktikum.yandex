import { ControllerType } from "../../controllerType";
import EventBus from "../../../EventBus";
import { GLOBAL_EVENTS } from "../../../GlobalEvents";

const eventBus = new EventBus();

export const messageInputController:ControllerType = {
    parent:{
        class: 'contenteditable',
    },
    mount() {
        if (!messageInputController.methods) {
            return;
        }
        eventBus.on(GLOBAL_EVENTS.SEND_MESSAGE_CLICK,messageInputController.methods.sendMessage.bind(messageInputController));
    },
    data:{
        content:'',
        input:null,
    },
    methods:{
        sendMessage() {
            if (messageInputController.data&&messageInputController.data.content.length>0) {
                eventBus.emit(GLOBAL_EVENTS.SEND_MESSAGE,messageInputController.data.content);
                if (messageInputController.data.input) {
                    messageInputController.data.input.classList.remove('contenteditable_active');
                    messageInputController.data.input.innerText = '';
                    messageInputController.data.input.dataset.placeholder = "Сообщение";
                }
            }
        }
    },
    events: [
        {
            type: 'input',
            callback: function (event:Event) {
                const target = <HTMLElement>event.target;
                const input = <HTMLElement|null>target.closest(`.${messageInputController.parent.class}`);
                if (!messageInputController.data) {
                    return;
                }
                if (!messageInputController.data.input) {
                    messageInputController.data.input = input;
                }
                if (!input) {
                    return;
                }
                if (input.textContent&&input.textContent.length>0) {
                    input.classList.add('contenteditable_active');
                    input.dataset.placeholder = "";
                    messageInputController.data.content = input.textContent;
                } else {
                    input.classList.remove('contenteditable_active');
                    input.dataset.placeholder = "Сообщение";
                    messageInputController.data.content = '';
                }
            }
        },
        {
            type: 'keydown',
            callback: function (event:KeyboardEvent) {
                if (event.code==='Enter'&&messageInputController.methods) {
                    messageInputController.methods.sendMessage();
                }
            }
        }
    ]
}