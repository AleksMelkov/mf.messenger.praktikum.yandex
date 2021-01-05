import EventBus from "../../../EventBus.js";
import { GLOBAL_EVENTS } from "../../../GlobalEvents.js";
import Store from "../../../Store.js";
import { GetUserApi } from "../../../api/getUserApi.js";
import { headerContentComponent } from "../../content/headerContent/controller.js";
import Router from "../../../Router.js";
import { ROUTE_LIST } from "../../../routes/routeList.js";
var eventBus = new EventBus();
var userApi = new GetUserApi('/user');
var router = new Router();
export var chatsController = {
    component_name: '',
    parent: {
        name: 'ul',
        class: 'chat-list',
    },
    elements: [
    // {
    //     id: 'pb6m8452xemf',
    //     class: 'chat-list__element',
    //     logo: 'https://sun1-17.userapi.com/impf/c848632/v848632779/1b774f/NVelhWIfl3c.jpg?size=200x0&quality=96&crop=0,0,1440,1440&sign=8a29ad1f3c8eeda59abf90663fb9a3da&ava=1',
    //     name: 'Иван',
    //     preview: 'Привет! Как дела? Придешь сегодня на учебу?',
    //     time: '16:20',
    //     show: 'true',
    //     count: 1
    // },
    ],
    mount: function () {
        if (!chatsController.methods) {
            return;
        }
        eventBus.on(GLOBAL_EVENTS.SEARCH, chatsController.methods.changeChatList.bind(chatsController));
        chatsController.methods.getUserChats();
    },
    methods: {
        getUserChats: function () {
            var store = new Store();
            store.value.chats.forEach(function (element) {
                chatsController.elements.push({
                    id: String(element.id),
                    class: 'chat-list__element',
                    name: String(element.title),
                    preview: '',
                    time: '',
                    show: 'false',
                    isAdd: 'false',
                    logo: String(element.avatar),
                    count: 0
                });
            });
        },
        changeChatList: function (data) {
            if (data.string === '') {
                chatsController.elements = [];
                if (chatsController.methods)
                    chatsController.methods.getUserChats();
                eventBus.emit(GLOBAL_EVENTS.CHANGE_ELEMENT_PROPS, chatsController.component_name, chatsController.elements);
            }
            else {
                userApi.create({ login: data.string })
                    .then(function (res) { return JSON.parse(res.responseText); })
                    .then(function (data) {
                    chatsController.elements = [];
                    data.forEach(function (element) {
                        chatsController.elements.push({
                            id: String(element.id),
                            class: 'chat-list__element',
                            name: element.second_name + ' ' + element.first_name,
                            preview: '',
                            time: '',
                            show: 'false',
                            isAdd: 'true',
                            logo: String(element.avatar),
                            count: 0
                        });
                    });
                    eventBus.emit(GLOBAL_EVENTS.CHANGE_ELEMENT_PROPS, chatsController.component_name, chatsController.elements);
                }).catch(function () {
                    router.go(ROUTE_LIST.SERVER_ERROR);
                });
            }
        },
        addUserToChat: function (event) {
            var target = event.target;
            var parent = target.closest('.chat-list__element');
            var headerChat = parent.querySelector('.content-area__header');
            var searchBlock = document.querySelector('.chats-search');
            var headerSearch = searchBlock.querySelector('.chats-search__header');
            searchBlock.setAttribute('user_id', parent.dataset.id);
            headerSearch.innerText = "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0447\u0430\u0442 \u0434\u043B\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F " + headerChat.innerText;
            searchBlock.style.display = 'block';
        }
    },
    events: [
        {
            type: 'click',
            callback: function (event) {
                var parent = event.target;
                if (parent && parent.closest('.info-area__add') && chatsController.methods) {
                    chatsController.methods.addUserToChat(event);
                }
                else {
                    var chatElement = parent.closest('.chat-list__element');
                    if (chatElement && chatElement.getAttribute('addingList') !== 'true') {
                        var elements = document.querySelectorAll('.chat-list__element');
                        if (elements) {
                            elements.forEach(function (item) {
                                item.classList.remove('chat-list__element_active');
                            });
                        }
                        if (!chatElement) {
                            return;
                        }
                        chatElement.classList.add('chat-list__element_active');
                        var headerElement = chatElement.querySelector('.content-area__header');
                        eventBus.emit(GLOBAL_EVENTS.CHANGE_ELEMENT_PROPS, headerContentComponent.component_name, { parent: {
                                class: 'main-content__header-name',
                                text: headerElement.innerText
                            }
                        });
                        var mainWrapper = document.querySelector('.main-content__header-info');
                        mainWrapper.setAttribute('chat-id', chatElement.dataset.id);
                        mainWrapper.classList.remove('main-content__header-info__hide');
                    }
                }
            }
        }
    ]
};
//# sourceMappingURL=controller.js.map