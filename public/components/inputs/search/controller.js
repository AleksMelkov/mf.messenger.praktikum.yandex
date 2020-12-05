export const searchController = {
    class: 'contenteditable',
    contenteditableVal: true,
    searchInput: ()=>{
        let searchInput = document.querySelector(`.${searchController.class}`);
        console.log(searchInput.textContent);
        globalEventBus.emit(GLOBAL_EVENTS.SEARCH)
    }
}