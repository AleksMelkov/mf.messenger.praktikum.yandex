import Store from "../../../Store.js";
export var profileHeaderController = {
    parent: {
        class: 'profile-wrapper__name',
        text: ''
    },
    mount: function () {
        var store = new Store();
        if (store.value.user.display_name === '<пусто>') {
            profileHeaderController.parent.text = store.value.user.login;
        }
        else {
            profileHeaderController.parent.text = store.value.user.display_name;
        }
    }
};
//# sourceMappingURL=controller.js.map