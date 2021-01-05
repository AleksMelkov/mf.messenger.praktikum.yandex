import { ControllerType } from "../../controllerType.js";
import Store from "../../../Store.js";
import { SaveUserAvatarApi } from "../../../api/saveUserApi.js";
import Router from "../../../Router.js";
import { ROUTE_LIST } from "../../../routes/routeList.js";

const saveAvatar = new SaveUserAvatarApi('/user/profile.js');
const router = new Router();

export const changeAvatarComponent:ControllerType = {
    parent: {
        class: 'profile-wrapper__avatar-block',
        avatar: '',
    },
    mount() {
        const store = new Store();
        changeAvatarComponent.parent.avatar = store.value.user.avatar;
    },
    methods:{
        changeAvatar(event:Event) {
            const input = event.target;
            if (input instanceof HTMLInputElement&&input.files) {
                const formData = new FormData();
                formData.append("avatar",input.files[0]);
                saveAvatar.update(formData)
                    .then(res=>JSON.parse(res.responseText))
                    .then(data=>{
                        const store = new Store();
                        store.dispatch({
                            type:"GET_USER_INFO",
                            payload:{avatar:data.avatar}
                        });
                        const avatarBlock = document.querySelector(`.${changeAvatarComponent.parent.class}`);
                        if (avatarBlock instanceof HTMLDivElement)
                            avatarBlock.style.backgroundImage = `url("https://ya-praktikum.tech${data.avatar}")`;

                    }).catch(()=>{
                        router.go(ROUTE_LIST.SERVER_ERROR)
                })
            }

        }
    },

}