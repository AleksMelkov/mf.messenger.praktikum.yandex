import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS } from "../../../GlobalEvents.js";
var eventBus = new EventBus();
export var searchController = {
    parent: {
        class: 'contenteditable',
    },
    contenteditableVal: true,
    events: [
        {
            type: 'input',
            callback: function () {
                var searchInput = document.querySelector("." + searchController.parent.class);
                if (!searchInput) {
                    return;
                }
                if (searchInput.textContent && searchInput.textContent.length > 0) {
                    searchInput.dataset.placeholder = "";
                }
                else {
                    searchInput.dataset.placeholder = "⌕ Поиск...";
                }
                console.log(searchInput.textContent);
                eventBus.emit(GLOBAL_EVENTS.SEARCH);
            }
        }
    ]
};
//# sourceMappingURL=controller.js.map