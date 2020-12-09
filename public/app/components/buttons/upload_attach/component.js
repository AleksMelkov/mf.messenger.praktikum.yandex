import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS } from "../../../GlobalEvents.js";
var eventBus = new EventBus();
export var uploadAttachController = {
    parent: {
        class: 'bottom-panel__file-upload',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                console.log('Открыть список доступных к загрузке приложений');
                eventBus.emit(GLOBAL_EVENTS.UPLOAD_ATTACH);
            }
        }
    ]
};
//# sourceMappingURL=component.js.map