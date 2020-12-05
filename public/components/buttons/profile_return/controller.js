export const profileReturnController = {
    class: 'profile-wrapper__return',
    event: {
        type: 'click',
        callback: function (event) {
            globalEventBus.emit(GLOBAL_EVENTS.PROFILE_RETURN)
        }
    },
}