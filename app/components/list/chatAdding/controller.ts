import { ControllerType } from "../../controllerType.js";
import Store from "../../../Store.js";
import Router from "../../../Router.js";
import { ChatsApi} from "../../../api/chatsApi.js";
import { ROUTE_LIST } from "../../../routes/routeList.js";

const chats = new ChatsApi();
const router = new Router();

export const chatAddingController:ControllerType = {
    parent: {
        name: 'ul',
        class: 'chats-search__list',
    },
    elements:[
        // {
        //     id:'100',
        //     class:'chats-search__element',
        //     name:'Тест',
        //     preview: '',
        // }
    ],
    mount() {
        if (chatAddingController.methods) chatAddingController.methods.getChats();
    },
    methods:{
        getChats() {
            const store = new Store();
            chatAddingController.elements = [];

            store.value.chats.forEach((chat:Record<string, string>)=>{
                (chatAddingController.elements as Record<string, string>[]).push({
                    id:chat.id,
                    class:'chats-search__element',
                    name: chat.title,
                    preview: chat.avatar,
                });
            })
        }
    },
    events: [
        {
            type: 'click',
            callback: function (event:Event) {
                const target = <HTMLElement>event.target;
                const parent = <HTMLElement>target.closest('.chats-search');
                const userId = Number(parent.getAttribute('user_id'));
                const element = <HTMLElement>target.closest('.chats-search__element');
                chats.update({users:[userId],chatId:element.dataset.id}).then(res=>{
                    if (res.status>=200&&res.status<299) {
                        parent.style.display = 'none';
                    }
                }).catch(()=>{
                    router.go(ROUTE_LIST.SERVER_ERROR);
                });
            }
        }
    ]
}