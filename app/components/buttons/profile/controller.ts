import { ControllerType } from "../../controllerType.js";
import Router from "../../../Router.js";
import { ROUTE_LIST} from "../../../routes/routeList.js";

const router = new Router();


export const profileController:ControllerType = {
    parent: {
        class: 'chats-wrapper__header-btn',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                const controlPanel = document.querySelector('.chats-wrapper__control-panel');
                if (controlPanel) controlPanel.remove();
                const searchPanel = document.querySelector('.chats-wrapper__search-panel');
                if (searchPanel) searchPanel.remove();
                router.go(ROUTE_LIST.PROFILE);
            }
        }
    ]
}