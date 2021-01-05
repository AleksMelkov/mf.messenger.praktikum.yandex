import Store from "../../../Store.js";
import { SaveUserPassApi } from "../../../api/save-user-api.js";
var savePass = new SaveUserPassApi('/user');
export var savePassController = {
    parent: {
        class: 'profile-wrapper-form__element',
    },
    methods: {},
    events: [
        {
            type: 'click',
            callback: function () {
                var store = new Store();
                var passwords = store.value.password;
                if (passwords.new_password !== passwords.repeat_password) {
                    document.querySelector('.profile-wrapper-form__element-input[name="repeat_password"]')
                        .closest('.profile-wrapper-form__element')
                        .style.borderColor = 'red';
                }
                else {
                    var data = {
                        oldPassword: passwords.old_password,
                        newPassword: passwords.new_password,
                    };
                    savePass.update(data).then(function (res) {
                        if (res.status >= 200 && res.status < 400) {
                            document.querySelector('.profile-wrapper-form__element-input[name="repeat_password"]')
                                .closest('.profile-wrapper-form__element')
                                .style.borderColor = 'rgb(206, 206, 206)';
                            var hideElements = document.querySelectorAll('.profile-wrapper-form__element[type="common"]');
                            Array.from(hideElements).forEach(function (item) {
                                if (!item.classList.contains('profile-wrapper-form__element_save')) {
                                    item.style.display = 'flex';
                                }
                            });
                            var showElements = document.querySelectorAll('.profile-wrapper-form__element[type="password"]');
                            Array.from(showElements).forEach(function (item) {
                                item.style.display = 'none';
                                var input = item.querySelector('.profile-wrapper-form__element-input');
                                if (!input) {
                                    return;
                                }
                                input.textContent = '';
                            });
                            store.dispatch({
                                type: "REMOVE_PASSWORDS",
                                payload: {
                                    old_password: '',
                                    new_password: '',
                                    repeat_password: ''
                                }
                            });
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            }
        }
    ]
};
//# sourceMappingURL=controller.js.map