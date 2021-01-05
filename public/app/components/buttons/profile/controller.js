import Router from "../../../Router.js";
import { ROUTE_LIST } from "../../../routes/routeList.js";
var router = new Router();
export var profileController = {
    parent: {
        class: 'chats-wrapper__header-btn',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                var controlPanel = document.querySelector('.chats-wrapper__control-panel');
                if (controlPanel)
                    controlPanel.remove();
                var searchPanel = document.querySelector('.chats-wrapper__search-panel');
                if (searchPanel)
                    searchPanel.remove();
                router.go(ROUTE_LIST.PROFILE);
            }
        }
    ]
};
//# sourceMappingURL=controller.js.map