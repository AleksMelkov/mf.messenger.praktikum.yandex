import { ControllerType } from "../../controllerType";
import Store from "../../../Store";
import Router from "../../../Router";
import { ChatsApi } from "../../../api/chatsApi";
import { ROUTE_LIST } from "../../../routes/routeList";

const chats = new ChatsApi();
const router = new Router();

export const newChatController:ControllerType = {
    parent: {
        class: 'chats-search__new-chat'
    },
    events:[
        {
            type: 'click',
            callback: function (event:Event) {
                const target = <HTMLElement>event.target;
                const parent = <HTMLElement>target.closest('.chats-search');
                const userId = Number(parent.getAttribute('user_id'));
                const title = prompt('Введите название чата');
                if (title) {
                    chats.create({title:title})
                        .then(res=>JSON.parse(res.responseText))
                        .then(data=>{
                            if (data.id) {
                                chats.update({users:[userId],chatId:data.id}).then(res=>{
                                    if (res.status>=200&&res.status<299) {
                                        const store = new Store();
                                        store.dispatch({
                                            type:"ADD_CHAT_ELEMENT",
                                            payload:{
                                                id:data.id,
                                                title:title,
                                                avatar:null,
                                            }
                                        })
                                        parent.style.display = 'none';
                                    }
                                }).catch(()=>{
                                    router.go(ROUTE_LIST.SERVER_ERROR);
                                })
                            }
                        }).catch(()=>{
                            router.go(ROUTE_LIST.SERVER_ERROR);
                    })
                }
            }
        }
    ],
}