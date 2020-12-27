import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS} from "../../../GlobalEvents.js";

const eventBus = new EventBus();
export const searchController = {
    parent: {
        class: 'contenteditable',
    },
    contenteditableVal: true,
    events: [
        {
            type: 'input',
            callback: function () {
                const searchInput:HTMLElement|null = document.querySelector(`.${searchController.parent.class}`);
                if (!searchInput) {
                    return;
                }
                if (searchInput.textContent&&searchInput.textContent.length>0) {
                    searchInput.dataset.placeholder = "";
                } else {
                    searchInput.dataset.placeholder = "⌕ Поиск...";
                }
                eventBus.emit(GLOBAL_EVENTS.SEARCH,{string:searchInput.textContent});
            }
        }
    ]
}