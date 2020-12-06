export const forgotPassController = {
    class: 'auth-window-btnArea__smallBtn',
    text: 'Забыли пароль? (временный переход к чатам)',
    event: {
        type: 'click',
        callback: function (event) {
            globalEventBus.emit(GLOBAL_EVENTS.FORGOT_PASS);
        }
    }
}