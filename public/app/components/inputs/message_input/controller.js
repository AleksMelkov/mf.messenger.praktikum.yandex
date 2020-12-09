export var messageInputController = {
    parent: {
        class: 'contenteditable',
    },
    events: [
        {
            type: 'input',
            callback: function (event) {
                var input = event.target.closest("." + messageInputController.parent.class);
                if (!input) {
                    return;
                }
                if (input.textContent && input.textContent.length > 0) {
                    input.classList.add('contenteditable_active');
                    input.dataset.placeholder = "";
                }
                else {
                    input.classList.remove('contenteditable_active');
                    input.dataset.placeholder = "Сообщение";
                }
                console.log('Открыть список доступных к загрузке приложений');
            }
        }
    ]
};
//# sourceMappingURL=controller.js.map