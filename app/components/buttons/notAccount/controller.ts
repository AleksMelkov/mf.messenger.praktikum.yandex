import { ControllerType } from "../../controllerType.js";
import Router from "../../../Router.js";
import { ROUTE_LIST} from "../../../routes/routeList.js";

const router = new Router();

export const notAccountController:ControllerType = {
    parent:{
        class: 'auth-window-btnArea__smallBtn',
        text: 'Нет аккаунта?',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                router.go(ROUTE_LIST.REGISTER);
            }
        }
    ]
}