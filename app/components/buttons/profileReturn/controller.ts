import { ControllerType } from "../../controllerType";
import Router from "../../../Router";
import { ROUTE_LIST } from "../../../routes/routeList";

const router = new Router();

export const profileReturnController:ControllerType = {
    parent: {
        class: 'profile-wrapper__return',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                const wrapper = document.querySelector('.profile-wrapper');
                if (wrapper) wrapper.remove();
                router.go(ROUTE_LIST.CHATS);
            }
        }
    ]
}