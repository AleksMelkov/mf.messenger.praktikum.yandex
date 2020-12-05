export const chatSettingsComponentButton = {
    class: 'fa-ellipsis-v',
    event: {
        type: 'click',
        callback: function (event) {
            document.querySelector('.header-dropdown__block').classList.toggle('header-dropdown__block_active');
        }
    }
}