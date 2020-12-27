import HTTPTransport from "../../../HTTPTransport.js";
import Router from "../../../Router.js";
import { ROUTE_LIST } from "../../../routes/routeList.js";
var http = new HTTPTransport();
var router = new Router();
export var exitProfileController = {
    parent: {
        class: 'profile-wrapper-form__element',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                http.post('/auth/logout').then(function (res) {
                    if (res.status === 200) {
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