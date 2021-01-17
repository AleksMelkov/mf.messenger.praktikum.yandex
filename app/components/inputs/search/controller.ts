import { ControllerType } from "../../controllerType";
import EventBus from "../../../EventBus";
import { GLOBAL_EVENTS} from "../../../GlobalEvents";

const eventBus = new EventBus();
export const searchController:ControllerType= {
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