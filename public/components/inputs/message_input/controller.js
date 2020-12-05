export const messageInputController = {
    class: 'contenteditable',
    event: {
        type: 'input',
        callback: function (event) {
            const input = event.target.closest(`.${messageInputController.class}`);
            if (input.textContent.length>0) {
                input.classList.add('contenteditable_active');
                input.dataset.placeholder = "";
            } else {
                input.classList.remove('contenteditable_active');
                input.dataset.placeholder = "Сообщение";
            }
            console.log('Открыть список доступных к загрузке приложений')
        }
    }
}