var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import Validator from "../../../Validator.js";
import Store from "../../../Store.js";
import { SaveUserProfileApi } from "../../../api/save-user-api.js";
var saveProfile = new SaveUserProfileApi('/user');
export var saveProfileController = {
    parent: {
        class: 'profile-wrapper-form__element',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                var store = new Store();
                if (!store.value.user) {
                    return false;
                }
                var error = false;
                var data = {
                    first_name: store.value.user.first_name,
                    second_name: store.value.user.second_name,
                    display_name: store.value.user.display_name,
                    login: store.value.user.login,
                    email: store.value.user.email,
                    phone: store.value.user.phone,
                };
                Object.entries(data).forEach(function (_a) {
                    var _b = __read(_a, 2), key = _b[0], item = _b[1];
                    if (!Validator.validate(item, key)) {
                        error = true;
                        document.querySelector(".profile-wrapper-form__element-input[name=\"" + key + "\"]")
                            .closest('.profile-wrapper-form__element[type="common"]')
                            .style.borderColor = 'red';
                    }
                });
                if (!error) {
                    saveProfile.update(data)
                        .then(function (res) {
                        if (res.status >= 200 && res.status < 400) {
                            var fields = document.querySelectorAll('.profile-wrapper-form__element[type="common"]');
                            fields.forEach(function (item) {
                                if (item.classList.contains('profile-wrapper-form__element_hide'))
                                    item.style.display = 'flex';
                                if (!item.classList.contains('profile-wrapper-form__element_hide') &&
                                    !item.classList.contains('profile-wrapper-form__element_save'))
                                    item.querySelector('.profile-wrapper-form__element-input').setAttribute('contenteditable', 'false');
                                if (item.classList.contains('profile-wrapper-form__element_save'))
                                    item.style.display = 'none';
                            });
                        }
                    })
                        .catch(function (error) {
                        console.log(error);
                    });
                }
            }
        }
    ]
};
//# sourceMappingURL=controller.js.map