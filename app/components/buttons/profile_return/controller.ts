import Router from "../../../Router.js";
import { ROUTE_LIST } from "../../../routes/routeList.js";

const router = new Router();

export const profileReturnController = {
    parent: {
        class: 'profile-wrapper__return',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                (document.querySelector('.profile-wrapper') as HTMLElement).remove();
                router.go(ROUTE_LIST.CHATS);
            }
        }
    ]
}