export var changePassController = {
    parent: {
        class: 'profile-wrapper-form__element',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                var hideElements = document.querySelectorAll('.profile-wrapper-form__element[type="common"]');
                Array.from(hideElements).forEach(function (item) {
                    item.style.display = 'none';
                });
                var showElements = document.querySelectorAll('.profile-wrapper-form__element[type="password"]');
                Array.from(showElements).forEach(function (item) {
                    item.style.display = 'flex';
                });
                var btnSave = document.querySelector('.profile-wrapper-form__element_save');
                if (btnSave) {
                    btnSave.style.display = 'none';
                }
            }
        }
    ]
};
//# sourceMappingURL=controller.js.map