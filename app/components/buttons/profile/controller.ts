import Router from "../../../Router.js";
import { ROUTE_LIST} from "../../../routes/routeList.js";

const router = new Router();


export const profileController = {
    parent: {
        class: 'chats-wrapper__header-btn',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                (document.querySelector('.chats-wrapper__control-panel') as HTMLElement).remove();
                (document.querySelector('.chats-wrapper__search-panel') as HTMLElement).remove();
                router.go(ROUTE_LIST.PROFILE);
            }
        }
    ]
}