import Router from "../../../Router.js";
import { ROUTE_LIST } from "../../../routes/routeList.js";
var router = new Router();
export var profileReturnController = {
    parent: {
        class: 'profile-wrapper__return',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                document.querySelector('.profile-wrapper').remove();
                router.go(ROUTE_LIST.CHATS);
            }
        }
    ]
};
//# sourceMappingURL=controller.js.map