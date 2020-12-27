import Page from "../Page.js";
import Store from "../Store.js";
import { ChatsApi } from "../api/chats-api.js";
import { ChatNewMsgApi } from "../api/chats-api.js";

import Button from "../components/buttons/Button.js";
import { favoriteTmpl} from "../components/buttons/favorite/template.js";
import { favoriteController} from "../components/buttons/favorite/controller.js";
import { profileTmpl} from "../components/buttons/profile/template.js";
import { profileController} from "../components/buttons/profile/controller.js";

import Input from "../components/inputs/Input.js";
import { searchTmpl} from "../components/inputs/search/template.js";
import { searchController} from "../components/inputs/search/controller.js";

import List from "../components/list/List.js";
import { chatsListTmpl } from "../components/list/chats/template.js";
import { chatsController } from "../components/list/chats/controller.js";

enum CONTROLLERS {
    FAVORITE = 'favorite-controller',
    PERSONAL = 'personal-controller',
    SEARCH = 'search-controller',
    CHATS = 'chats-controller',
}

enum ELEMENTS {
    FAVORITE = 'favorite',
    PERSONAL = 'personal',
    SEARCH = 'search',
    CHATS = 'chats'
}

const chatsApi = new ChatsApi();
const newMsgApi = new ChatNewMsgApi('/chats');

export default class Chats extends Page {
    protected headerBtnBlock:HTMLElement|null;
    protected searchBlock:HTMLElement|null;
    protected leftSidebar:HTMLElement|null;
    protected store:Store;


    constructor() {
        super();
        this.initStore();

        this.title = 'Чаты';
        this.installTitle();

    }

    protected initStore() {
        this.store = new Store({
            chats:this.chatsReducer
        },{
            chats:[],
        });
    }

    protected chatsReducer(state:Record<string, any>, action: { type: string, payload: any }) {
        switch (action.type) {
            case 'ADD_CHAT_ELEMENT': {
                state.push(action.payload);
            }
        }

        return state;
    }

    public getData() {
        this.store.dispatch({type:'CHANGE_STATUS'});
        return chatsApi.request()
            .then(res=>JSON.parse(res.responseText))
            .then(data=>{
                data.forEach((chat:Record<string, string>)=>{
                    newMsgApi.request(chat.id)
                        .then(res=>JSON.parse(res.responseText))
                        .then(count=>{
                            chat.unread_count = count.unread_count;
                        });
                    this.store.dispatch({
                        type:'ADD_CHAT_ELEMENT',
                        payload:chat
                    });
                });
                this.store.dispatch({type:'CHANGE_STATUS'});
                return new Promise(resolve => {
                    if (this.store.value.load.inProgress) {
                        resolve(this);
                    }
                });
            })
    }

    public init() {
        this.baseRender();

        this.favoriteInit();
        this.personalInit();
        this.searchInit();
        this.chatsInit();
    }

    protected baseRender() {
        this.leftSidebar = document.querySelector('.chats-wrapper__left-sidebar');
        (this.leftSidebar as HTMLElement).innerHTML = '';
        this.headerBtnBlock = document.querySelector('.chats-wrapper__control-panel');
        if (!this.headerBtnBlock) {
            this.headerBtnBlock = document.createElement('div');
            this.headerBtnBlock.classList.add('chats-wrapper__control-panel');
            (this.leftSidebar as HTMLElement).appendChild(this.headerBtnBlock);
        }
        this.searchBlock = document.querySelector('.chats-wrapper__search-panel');
        if (!this.searchBlock) {
            this.searchBlock = document.createElement('div');
            this.searchBlock.classList.add('chats-wrapper__search-panel');
            (this.leftSidebar as HTMLElement).appendChild(this.searchBlock);
        }
    }

    protected favoriteInit() {
        this.mountComponent(CONTROLLERS.FAVORITE,favoriteController);
        this.addingElement(ELEMENTS.FAVORITE,Button,CONTROLLERS.FAVORITE,favoriteTmpl);
        this.renderAppend((this.headerBtnBlock as HTMLElement),ELEMENTS.FAVORITE);
    }

    protected personalInit() {
        this.mountComponent(CONTROLLERS.PERSONAL,profileController);
        this.addingElement(ELEMENTS.PERSONAL,Button,CONTROLLERS.PERSONAL,profileTmpl);
        this.renderAppend((this.headerBtnBlock as HTMLElement),ELEMENTS.PERSONAL);
    }

    protected searchInit() {
        this.mountComponent(CONTROLLERS.SEARCH,searchController);
        this.addingElement(ELEMENTS.SEARCH,Input,CONTROLLERS.SEARCH,searchTmpl);
        this.renderAppend((this.searchBlock as HTMLElement),ELEMENTS.SEARCH);
    }

    protected chatsInit() {
        this.mountComponent(CONTROLLERS.CHATS,chatsController);
        this.addingElement(ELEMENTS.CHATS,List,CONTROLLERS.CHATS,chatsListTmpl);
        this.renderAppend((this.leftSidebar as HTMLElement),ELEMENTS.CHATS);
    }


}