import { ControllerType } from '../../controllerType';
import EventBus from '../../../EventBus';
import { GLOBAL_EVENTS } from '../../../GlobalEvents';
import { GetToken } from '../../../api/sendMsgApi';
import { ChatUsersApi } from '../../../api/chatsApi';
import Store from '../../../Store';
import ChatWebSocket from '../../../ChatWebSocket';

const eventBus = new EventBus();
const getToken = new GetToken();
const chatUsers = new ChatUsersApi('/chats');

export const messagesController:ControllerType = {
  parent: {
    name: 'ul',
    class: 'chat-area',
  },
  elements: [
    // {
    //     class: 'chat-area__date',
    //     text: '11 ноября',
    // },
    // {
    //     class: 'chat-area__row_in',
    //     text: '<div class="chat-area__message chat-area__message_in'+
    //     ' chat-area__message_image" data-time="15:30">\n' +
    //         '<img src="images/image-test.jpg" alt="test">\n' +
    //         '</div>'
    // },
    // {
    //     class: 'chat-area__row_out',
    //     text: '<div class="chat-area__message chat-area__message_out" data-time="16:20">\n' +
    //         '                    Че-как?\n' +
    //         '                </div>'
    // },
  ],
  socket: null,
  mount() {
    if (!messagesController.methods) {
      return;
    }
    eventBus.on(
      GLOBAL_EVENTS.GET_CHAT_MESSAGES,
      messagesController.methods.getMessages.bind(messagesController),
    );
    eventBus.on(
      GLOBAL_EVENTS.NEW_MESSAGE,
      messagesController.methods.newMessages.bind(messagesController),
    );
    eventBus.on(
      GLOBAL_EVENTS.SEND_MESSAGE,
      messagesController.methods.sendMessage.bind(messagesController),
    );
  },
  methods: {
    getChatToken(id:number) {
      return getToken.create<number>(id)
        .then((res) => JSON.parse(res.responseText))
        .then((data) => Promise.resolve(data.token));
    },
    getMessages(chatId:number) {
      if (!messagesController.methods) {
        return;
      }
      messagesController.methods.getChatToken(chatId).then((token:string) => {
        const store = new Store();
        store.dispatch({
          type: 'CLEAR_LIST',
        });
        if (!messagesController.methods) {
          return;
        }
        messagesController.methods.getChatUsers(chatId, store).then(() => {
          eventBus.emit(
            GLOBAL_EVENTS.CHANGE_ELEMENT_PROPS,
            messagesController.componentName,
            { elements: [] },
          );
          messagesController.socket = new ChatWebSocket(store.value.user.id, chatId, token);
        });
      });
    },
    newMessages(data:Record<string, string>[]) {
      const store = new Store();
      if (!messagesController.methods) {
        return;
      }
      if (!Array.isArray(data) && messagesController.elements) {
        const newElement:Record<string, string> = data;
        const date = new Date(newElement.time);
        let messageType = 'out';
        if (newElement.userId !== store.value.user.id) {
          messageType = 'in';
        }
        messagesController.elements.push({
          class: `chat-area__row_${messageType}`,
          text: `<div class="chat-area__message chat-area__message_${messageType}" data-time="${date.getHours()}:${String(date.getMinutes()).length === 2 ? date.getMinutes() : `${date.getMinutes()}0`}"><h5>${store.value.user_list[newElement.userId]}</h5><p>${newElement.content}</p></div>`,
        });
        eventBus.emit(
          GLOBAL_EVENTS.CHANGE_ELEMENT_PROPS,
          messagesController.componentName,
          { elements: messagesController.elements },
        );
        messagesController.methods.scrollBottom();
        return;
      }
      const newData:Record<string, string>[] = [];
      data.forEach((element) => {
        const date = new Date(element.time);
        let messageType = 'out';
        if (element.user_id !== store.value.user.id) {
          messageType = 'in';
        }
        newData.unshift({
          class: `chat-area__row_${messageType}`,
          text: `<div class="chat-area__message chat-area__message_${messageType}" data-time="${date.getHours()}:${String(date.getMinutes()).length === 2 ? date.getMinutes() : `${date.getMinutes()}0`}"><h5>${store.value.user_list[element.user_id]}</h5><p>${element.content}</p></div>`,
        });
      });
      eventBus.emit(
        GLOBAL_EVENTS.CHANGE_ELEMENT_PROPS,
        messagesController.componentName,
        { elements: newData },
      );
      messagesController.methods.scrollBottom();
    },
    sendMessage(content:string) {
      if (messagesController.socket) {
        messagesController.socket.sendMessage({
          content,
          type: 'message',
        });
      }
    },
    getChatUsers(chatId:number, store:Store) {
      return chatUsers.request(String(chatId))
        .then((res) => JSON.parse(res.responseText))
        .then((data) => {
          data.forEach((user:Record<string, any>) => {
            store.dispatch({
              type: 'ADD_TO_LIST',
              payload: user,
            });
          });
          return Promise.resolve();
        });
    },
    scrollBottom() {
      if (messagesController.parent) {
        const chatList = document.querySelector(`.${messagesController.parent.class}`);
        if (chatList) { chatList.scrollTop = chatList.scrollHeight; }
      }
    },
  },
};
