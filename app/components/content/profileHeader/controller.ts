import { ControllerType } from "../../controllerType";
import Store from "../../../Store";

export const profileHeaderController:ControllerType = {
    parent: {
        class: 'profile-wrapper__name',
        text: ''
    },
    mount() {
        const store = new Store();
        if (store.value.user.display_name==='<пусто>') {
            profileHeaderController.parent.text = store.value.user.login;
        } else {
            profileHeaderController.parent.text = store.value.user.display_name;
        }
    }
}