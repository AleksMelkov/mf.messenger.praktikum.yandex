export const searchController = {
    class: 'contenteditable',
    contenteditableVal: true,
    event: {
        type: 'input',
        callback: function () {
            let searchInput = document.querySelector(`.${searchController.class}`);
            if (searchInput.textContent.length>0) {
                searchInput.dataset.placeholder = "";
            } else {
                searchInput.dataset.placeholder = "⌕ Поиск...";
            }
            console.log(searchInput.textContent);
            globalEventBus.emit(GLOBAL_EVENTS.SEARCH)
        }
    }
}