import { ControllerType } from '../../controllerType';
import EventBus from '../../../EventBus';
import { GLOBAL_EVENTS } from '../../../GlobalEvents';
import Store from '../../../Store';
import { GetUserApi } from '../../../api/getUserApi';
import { headerContentComponent } from '../../content/headerContent/controller';
import Router from '../../../Router';
import { ROUTE_LIST } from '../../../routes/routeList';

const eventBus = new EventBus();
const userApi = new GetUserApi('/user');
const router = new Router();

type ChatElement = Record<string, string|number>

type Element = {
    id:string,
    class:string,
    logo:string,
    name:string,
    preview?:string,
    time?:string,
    show:string,
    isAdd?:string,
    count?:number,
}

export const chatsController:ControllerType = {
  componentName: '',
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
  mount() {
    if (!chatsController.methods) {
      return;
    }
    eventBus.on(GLOBAL_EVENTS.SEARCH, chatsController.methods.changeChatList.bind(chatsController));
    chatsController.methods.getUserChats();
  },
  methods: {
    getUserChats() {
      const store = new Store();
      store.value.chats.forEach((element:ChatElement) => {
        (chatsController.elements as Element[]).push({
          id: String(element.id),
          class: 'chat-list__element',
          name: String(element.title),
          preview: '',
          time: '',
          show: 'false',
          isAdd: 'false',
          logo: String(element.avatar),
          count: 0,
        });
      });
    },
    changeChatList(data:Record<string, string>):void {
      if (data.string === '') {
        chatsController.elements = [];
        if (chatsController.methods) chatsController.methods.getUserChats();
        eventBus.emit(
          GLOBAL_EVENTS.CHANGE_ELEMENT_PROPS,
          chatsController.componentName,
          chatsController.elements,
        );
      } else {
        userApi.create({ login: data.string })
          .then((res) => JSON.parse(res.responseText))
          .then((data) => {
            chatsController.elements = [];
            data.forEach((element:Record<string, unknown>) => {
              (chatsController.elements as Element[]).push({
                id: String(element.id),
                class: 'chat-list__element',
                name: `${element.second_name} ${element.first_name}`,
                preview: '',
                time: '',
                show: 'false',
                isAdd: 'true',
                logo: String(element.avatar),
                count: 0,
              });
            });
            eventBus.emit(
              GLOBAL_EVENTS.CHANGE_ELEMENT_PROPS,
              chatsController.componentName,
              chatsController.elements,
            );
          }).catch(() => {
            router.go(ROUTE_LIST.SERVER_ERROR);
          });
      }
    },
    addUserToChat(event:Event) {
      const target = <HTMLElement>event.target;
      const parent = <HTMLElement>target.closest('.chat-list__element');
      const headerChat = <HTMLElement>parent.querySelector('.content-area__header');
      const searchBlock = <HTMLElement>document.querySelector('.chats-search');
      const headerSearch = <HTMLElement>searchBlock.querySelector('.chats-search__header');
      searchBlock.setAttribute('user_id', <string>parent.dataset.id);
      headerSearch.innerText = `Выбрать чат для пользователя ${headerChat.innerText}`;
      searchBlock.style.display = 'block';
    },
  },
  events: [
    {
      type: 'click',
      callback(event:Event) {
        const parent = <HTMLDivElement>event.target;
        if (parent && parent.closest('.info-area__add') && chatsController.methods) {
          chatsController.methods.addUserToChat(event);
        } else {
          const chatElement = <HTMLDivElement>parent.closest('.chat-list__element');
          if (chatElement && chatElement.getAttribute('addingList') !== 'true') {
            const elements:NodeList|null = document.querySelectorAll('.chat-list__element');
            if (elements) {
              elements.forEach((item:HTMLElement) => {
                item.classList.remove('chat-list__element_active');
              });
            }
            if (!chatElement) {
              return;
            }
            chatElement.classList.add('chat-list__element_active');
            const headerElement = <HTMLDivElement>chatElement.querySelector('.content-area__header');
            eventBus.emit(
              GLOBAL_EVENTS.CHANGE_ELEMENT_PROPS,
              headerContentComponent.componentName, {
                parent: {
                  class: 'main-content__header-name',
                  text: headerElement.innerText,
                },
              },
            );
            const mainWrapper = <HTMLDivElement>document.querySelector('.chats-wrapper__main-content');
            mainWrapper.setAttribute('chat-id', <string>chatElement.dataset.id);
            mainWrapper.classList.remove('chats-wrapper__main-content-hide');
            const chatId = chatElement.dataset.id;
            eventBus.emit(GLOBAL_EVENTS.GET_CHAT_MESSAGES, chatId);
          }
        }
      },
    },
  ],
};
