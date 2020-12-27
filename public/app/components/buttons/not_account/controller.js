import Router from "../../../Router.js";
import { ROUTE_LIST } from "../../../routes/routeList.js";
var router = new Router();
export var notAccountController = {
    parent: {
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
};
//# sourceMappingURL=controller.js.map