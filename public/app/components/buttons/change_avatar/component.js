import Store from "../../../Store.js";
import { SaveUserAvatarApi } from "../../../api/save-user-api.js";
var saveAvatar = new SaveUserAvatarApi('/user/profile');
export var changeAvatarComponent = {
    parent: {
        class: 'profile-wrapper__avatar-block',
        avatar: '',
    },
    mount: function () {
        var store = new Store();
        changeAvatarComponent.parent.avatar = store.value.user.avatar;
    },
    methods: {
        changeAvatar: function (event) {
            var input = event.target;
            if (input instanceof HTMLInputElement && input.files) {
                var formData = new FormData();
                formData.append("avatar", input.files[0]);
                saveAvatar.update(formData)
                    .then(function (res) { return JSON.parse(res.responseText); })
                    .then(function (data) {
                    var store = new Store();
                    store.dispatch({
                        type: "GET_USER_INFO",
                        payload: { avatar: data.avatar }
                    });
                    var avatarBlock = document.querySelector("." + changeAvatarComponent.parent.class);
                    if (avatarBlock instanceof HTMLDivElement)
                        avatarBlock.style.backgroundImage = "url(\"https://ya-praktikum.tech" + data.avatar + "\")";
                });
            }
        }
    },
};
//# sourceMappingURL=component.js.map