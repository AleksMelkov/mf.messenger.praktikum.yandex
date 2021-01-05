import Page from "../Page.js";
import { ChatsApi } from "../api/chatsApi.js";
import { ChatNewMsgApi } from "../api/chatsApi.js";
import Router from "../Router.js";
import { ROUTE_LIST } from "../routes/routeList.js";

import Button from "../components/buttons/Button.js";
import { favoriteTmpl} from "../components/buttons/favorite/template.js";
import { favoriteController} from "../components/buttons/favorite/controller.js";
import { profileTmpl} from "../components/buttons/profile/template.js";
import { profileController} from "../components/buttons/profile/controller.js";
import { newChatTmpl } from "../components/buttons/newChat/template.js";
import { newChatController } from "../components/buttons/newChat/controller.js";
import { chatSettingsButtonTmpl} from "../components/buttons/chatSettings/template.js";
import { chatSettingsComponentButton} from "../components/buttons/chatSettings/component.js";

import Input from "../components/inputs/Input.js";
import { searchTmpl} from "../components/inputs/search/template.js";
import { searchController} from "../components/inputs/search/controller.js";

import List from "../components/list/List.js";
import { chatsListTmpl } from "../components/list/chats/template.js";
import { chatsController } from "../components/list/chats/controller.js";
import { chatAddingTmpl } from "../components/list/chatAdding/template.js";
import { chatAddingController } from "../components/list/chatAdding/controller.js";
import { chatSettingsTmpl } from "../components/list/chatSettings/template.js";
import { chatSettingsController } from "../components/list/chatSettings/controller.js";

import Content from "../components/content/Content.js";
import { headerContentTmpl} from "../components/content/headerContent/template.js";
import { headerContentComponent} from "../components/content/headerContent/controller.js";

enum CONTROLLERS {
    FAVORITE = 'favorite-controller',
    PERSONAL = 'personal-controller',
    SEARCH = 'search-controller',
    CHATS = 'chats-controller',
    NEW_CHAT = 'new_chat_controller',
    ADD_TO_CHAT = 'add-controller',
    HEADER_NAME = 'header-name-controller',
    CHAT_SETTING_BTN = 'chat-setting-btn-controller',
    CHAT_SETTINGS = 'chat-settings-controller',
}

enum ELEMENTS {
    FAVORITE = 'favorite',
    PERSONAL = 'personal',
    SEARCH = 'search',
    CHATS = 'chats',
    NEW_CHAT = 'new_chat',
    ADD_TO_CHAT = 'add',
    HEADER_NAME = 'header-name',
    CHAT_SETTING_BTN = 'chat-setting-btn',
    CHAT_SETTINGS = 'chat-settings',
}

const chatsApi = new ChatsApi();
const newMsgApi = new ChatNewMsgApi('/chats');
const router = new Router();

export default class Chats extends Page {
    protected headerBtnBlock:HTMLElement|null;
    protected searchBlock:HTMLElement|null;
    protected leftSidebar:HTMLElement|null;
    protected addingPopup:HTMLElement|null;
    protected headerInfo:HTMLElement|null;
    protected settingBtn:HTMLElement|null;
    protected settingBlock:HTMLElement|null;

    constructor() {
        super();

        this.title = 'Чаты';
        this.installTitle();

    }

    public getData() {
        this.baseStore.dispatch({type:'CLEAR_CHATS'});
        return chatsApi.request()
            .then(res=>JSON.parse(res.responseText))
            .then(data=>{
                data.forEach((chat:Record<string, string>)=>{
                    newMsgApi.request(chat.id)
                        .then(res=>JSON.parse(res.responseText))
                        .then(count=>{
                            chat.unread_count = count.unread_count;
                        });
                    this.baseStore.dispatch({
                        type:'ADD_CHAT_ELEMENT',
                        payload:chat
                    });
                });
                return new Promise(resolve => {
                    resolve(this);
                });
            }).catch(()=>{
                router.go(ROUTE_LIST.SERVER_ERROR);
            })
    }

    public init() {
        this.baseRender();

        this.favoriteInit();
        this.personalInit();

        this.searchInit();
        this.newChatBtnInit();
        this.chatAddInit();
        this.chatsInit();
        this.headerNameInit();
        this.chatSettingBtnInit();
        this.chatSettingListInit();
    }

    protected baseRender() {
        this.leftSidebar = document.querySelector('.chats-wrapper__left-sidebar');
        if (!this.leftSidebar) {
            return;
        }
        this.leftSidebar.innerHTML = '';
        this.headerBtnBlock = document.querySelector('.chats-wrapper__control-panel');
        if (!this.headerBtnBlock) {
            this.headerBtnBlock = document.createElement('div');
            this.headerBtnBlock.classList.add('chats-wrapper__control-panel');
            this.leftSidebar.appendChild(this.headerBtnBlock);
        }
        this.searchBlock = document.querySelector('.chats-wrapper__search-panel');
        if (!this.searchBlock) {
            this.searchBlock = document.createElement('div');
            this.searchBlock.classList.add('chats-wrapper__search-panel');
            this.leftSidebar.appendChild(this.searchBlock);
        }
        this.addingPopup = document.querySelector('.chats-search');
        this.headerInfo = document.querySelector('.main-content__header-info');
        this.settingBtn = document.querySelector('.main-content__header-dropdown');
        this.settingBlock = document.querySelector('.header-dropdown__block');
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

    protected newChatBtnInit() {
        this.mountComponent(CONTROLLERS.NEW_CHAT,newChatController);
        this.addingElement(ELEMENTS.NEW_CHAT,Button,CONTROLLERS.NEW_CHAT,newChatTmpl);
        if (this.addingPopup instanceof HTMLDivElement)
            this.renderAppend(this.addingPopup,ELEMENTS.NEW_CHAT);
    }

    protected chatAddInit() {
        this.mountComponent(CONTROLLERS.ADD_TO_CHAT,chatAddingController);
        this.addingElement(ELEMENTS.ADD_TO_CHAT,List,CONTROLLERS.ADD_TO_CHAT,chatAddingTmpl);
        if (this.addingPopup instanceof HTMLDivElement)
            this.renderAppend(this.addingPopup,ELEMENTS.ADD_TO_CHAT);
    }

    protected headerNameInit() {
        this.mountComponent(CONTROLLERS.HEADER_NAME,headerContentComponent);
        this.addingElement(ELEMENTS.HEADER_NAME,Content,CONTROLLERS.HEADER_NAME,headerContentTmpl);
        if (this.headerInfo instanceof HTMLDivElement)
            this.renderPrepend(this.headerInfo,ELEMENTS.HEADER_NAME);
    }

    protected chatSettingBtnInit() {
        this.mountComponent(CONTROLLERS.CHAT_SETTING_BTN,chatSettingsComponentButton);
        this.addingElement(ELEMENTS.CHAT_SETTING_BTN,Button,CONTROLLERS.CHAT_SETTING_BTN,chatSettingsButtonTmpl);
        if (this.settingBtn instanceof HTMLDivElement)
            this.renderAppend(this.settingBtn,ELEMENTS.CHAT_SETTING_BTN);
    }

    protected chatSettingListInit() {
        this.mountComponent(CONTROLLERS.CHAT_SETTINGS,chatSettingsController);
        this.addingElement(ELEMENTS.CHAT_SETTINGS,List,CONTROLLERS.CHAT_SETTINGS,chatSettingsTmpl);
        if (this.settingBlock instanceof HTMLDivElement)
            this.renderAppend(this.settingBlock,ELEMENTS.CHAT_SETTINGS);
    }

    protected chatSettingInit() {
        this.mountComponent(CONTROLLERS.ADD_TO_CHAT,chatAddingController);
        this.addingElement(ELEMENTS.ADD_TO_CHAT,List,CONTROLLERS.ADD_TO_CHAT,chatAddingTmpl);
        if (this.addingPopup instanceof HTMLDivElement)
            this.renderAppend(this.addingPopup,ELEMENTS.ADD_TO_CHAT);
    }
}