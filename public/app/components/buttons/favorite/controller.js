export var favoriteController = {
    parent: {
        class: 'chats-wrapper__header-btn',
    },
    events: [
        {
            type: 'click',
            callback: function (event) {
                var block = event.target;
                var button = block.closest("." + favoriteController.parent.class);
                // let eventType:string;
                if (button) {
                    if (button.classList.contains('chats-wrapper__header-btn-active')) {
                        console.log('Открываем скрытые чаты');
                        // eventType = 'hide';
                    }
                    else {
                        console.log('Получаем идентификатор чата с избранными сообщениями');
                        // eventType = 'show';
                    }
                    button.classList.toggle('chats-wrapper__header-btn-active');
                }
            }
        }
    ]
};
//# sourceMappingURL=controller.js.map