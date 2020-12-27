import HTTPTransport from "../../../HTTPTransport.js";
import Router from "../../../Router.js";
import { ROUTE_LIST } from "../../../routes/routeList.js";

const http = new HTTPTransport();
const router = new Router();

export const exitProfileController = {
    parent: {
        class: 'profile-wrapper-form__element',
    },

    events: [
        {
            type: 'click',
            callback: function () {
                http.post('/auth/logout').then(res=>{
                    if (res.status===200) {
                        (document.querySelector('.profile-wrapper') as HTMLElement).remove();
                        router.go(ROUTE_LIST.AUTH);
                    }
                }).catch(()=>{
                    router.go(ROUTE_LIST.SERVER_ERROR);
                })
            }
        }
    ]
}