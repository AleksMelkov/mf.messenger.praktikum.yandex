import { ControllerType } from "../../controllerType";
import Router from "../../../Router";
import { ROUTE_LIST } from "../../../routes/routeList";
import { AuthLogout } from "../../../api/authApi";

const router = new Router();
const logout = new AuthLogout('/auth');

export const exitProfileController:ControllerType = {
    parent: {
        class: 'profile-wrapper-form__element',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                logout.create().then(res=>{
                    if (res.status>=200&&res.status<=299) {
                        const wrapper = document.querySelector('.profile-wrapper');
                        if (wrapper) wrapper.remove();
                        router.go(ROUTE_LIST.AUTH);
                    }
                }).catch(()=>{
                    router.go(ROUTE_LIST.SERVER_ERROR);
                })
            }
        }
    ]
}