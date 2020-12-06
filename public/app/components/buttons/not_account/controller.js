export const notAccountController = {
    class: 'auth-window-btnArea__smallBtn',
    text: 'Нет аккаунта?',
    event: {
        type: 'click',
        callback: function (event) {
            globalEventBus.emit(GLOBAL_EVENTS.TO_REGISTRATION);
        }
    }
}