import Router from "../../../Router.js";
import { ROUTE_LIST } from "../../../routes/routeList.js";
import { AuthLogout } from "../../../api/auth-api.js";
var router = new Router();
var logout = new AuthLogout('/auth');
export var exitProfileController = {
    parent: {
        class: 'profile-wrapper-form__element',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                logout.create().then(function (res) {
                    if (res.status >= 200 && res.status <= 400) {
                        document.querySelector('.profile-wrapper').remove();
                        router.go(ROUTE_LIST.AUTH);
                    }
                }).catch(function () {
                    router.go(ROUTE_LIST.SERVER_ERROR);
                });
            }
        }
    ]
};
//# sourceMappingURL=controller.js.map