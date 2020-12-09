export var chatSettingsComponentButton = {
    parent: {
        class: 'fa-ellipsis-v',
    },
    events: [
        {
            type: 'click',
            callback: function () {
                var block = document.querySelector('.header-dropdown__block');
                if (block) {
                    block.classList.toggle('header-dropdown__block_active');
                }
            }
        }
    ]
};
//# sourceMappingURL=component.js.map