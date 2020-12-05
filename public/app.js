import Button from "./components/buttons/Button.js";
import { favoriteTmpl } from "./components/buttons/favorite/template.js";
import { favoriteController } from "./components/buttons/favorite/controller.js";
import { profileTmpl } from "./components/buttons/profile/template.js";
import { profileController } from "./components/buttons/profile/controller.js";
import { chatSettingsButtonTmpl } from "./components/buttons/chat_settings/template.js";
import { chatSettingsComponentButton } from "./components/buttons/chat_settings/component.js";
import { authSubmitTmpl } from "./components/buttons/auth_submit/template.js";
import { authSubmitController } from "./components/buttons/auth_submit/controller.js";
import { notAccountTmpl } from "./components/buttons/not_account/template.js";
import { notAccountController } from "./components/buttons/not_account/controller.js";
import { registerSubmitTmpl } from "./components/buttons/registerSubmit/template.js";
import { registerSubmitController } from "./components/buttons/registerSubmit/controller.js";
import { forgotPassTmpl } from "./components/buttons/forgot_pass/template.js";
import { forgotPassController } from "./components/buttons/forgot_pass/controller.js";
import { profileReturnTmpl } from "./components/buttons/profile_return/template.js";
import { profileReturnController } from "./components/buttons/profile_return/controller.js";
import { changeAvatarTmpl } from "./components/buttons/change_avatar/template.js";
import { changeAvatarComponent } from "./components/buttons/change_avatar/component.js";
import { changeProfileTmpl } from "./components/buttons/change_profile/template.js";
import { changeProfileController } from "./components/buttons/change_profile/controller.js";
import { changePassTmpl } from "./components/buttons/change_pass/template.js";
import { changePassController } from "./components/buttons/change_pass/controller.js";
import { exitProfileTmpl } from "./components/buttons/exit_profile/template.js";
import { exitProfileController } from "./components/buttons/exit_profile/controller.js";
import { saveProfileTmpl } from "./components/buttons/save_profile/template.js";
import { saveProfileController } from "./components/buttons/save_profile/controller.js";
import { savePassTmpl } from "./components/buttons/save_pass/template.js";
import { savePassController } from "./components/buttons/save_pass/controller.js";
import { sendMessageTmpl } from "./components/buttons/send_message/template.js";
import { sendMessageController } from "./components/buttons/send_message/component.js";
import { uploadAttachTmpl } from "./components/buttons/upload_attach/template.js";
import { uploadAttachController } from "./components/buttons/upload_attach/component.js";

import Input from "./components/inputs/Input.js";
import { searchTmpl } from "./components/inputs/search/template.js";
import { searchController } from "./components/inputs/search/controller.js";
import { messageInputTmpl } from "./components/inputs/message_input/template.js";
import { messageInputController } from "./components/inputs/message_input/controller.js";

import List from "./components/list/List.js";
import { chatsListTmpl } from "./components/list/chats/template.js";
import { chatsController } from "./components/list/chats/controller.js";
import { chatSettingsTmpl } from "./components/list/chat_settings/template.js";
import { chatSettingsController } from "./components/list/chat_settings/controller.js";
import { messagesTmpl } from "./components/list/messages/template.js";
import { messagesController } from "./components/list/messages/controller.js";

import Content from "./components/content/Content.js";
import { headerContentTmpl } from "./components/content/header_content/template.js";
import { headerContentComponent } from "./components/content/header_content/controller.js";
import { profileHeaderTmpl } from "./components/content/profile_header/template.js";
import { profileHeaderController } from "./components/content/profile_header/controller.js";

import Form from "./components/forms/Form.js";
import { authTmpl } from "./components/forms/auth/template.js";
import { authController } from "./components/forms/auth/controller.js";
import { registrationTmpl } from "./components/forms/registration/template.js";
import { registrationController } from "./components/forms/registration/controller.js";
import { profileFormTemplate } from "./components/forms/profile_form/template.js";
import { profileFormController } from "./components/forms/profile_form/controller.js";


import EventBus from "./app/EventBus.js";

window.GLOBAL_EVENTS = {
    FAVORITE: 'favorite_click',
    PROFILE: 'profile_click',
    SEARCH: 'search_input',
    CHAT_ELEMENT: 'chat_click',
    TO_REGISTRATION: 'to_registration',
    FORGOT_PASS: 'forgot_pass',
    PROFILE_RETURN: 'profile_return',
    PROFILE_CHANGE: 'profile_change',
    SAVE_PROFILE: 'save_profile',
    PASS_CHANGE: 'pass_change',
    SAVE_PASS: 'save_pass',
    UPLOAD_ATTACH: 'upload_attach',
    SEND_MESSAGE: 'send_message',
}

window.globalEventBus = new EventBus();

class App {
    constructor() {
        this.elements = {}
        this.state = {
            isAuth:false,
            activeChat:{},
            user:{}
        }
        this._initEvents();
    }

    init() {
        if (!this.state.isAuth) {
            this.renderAuthForm();
        } else {
            this.renderHeaderButtons();
            this.renderSearchInput();
            this.renderChats();
        }
    }

    _initEvents() {
        globalEventBus.on(GLOBAL_EVENTS.FAVORITE,this.favoriteEvent.bind(this));
        globalEventBus.on(GLOBAL_EVENTS.PROFILE,this.profileEvent.bind(this));
        globalEventBus.on(GLOBAL_EVENTS.SEARCH,this.searchEvent);
        globalEventBus.on(GLOBAL_EVENTS.CHAT_ELEMENT,this.chatElementEvent.bind(this));
        globalEventBus.on(GLOBAL_EVENTS.TO_REGISTRATION,this.notAccountEvent.bind(this));
        globalEventBus.on(GLOBAL_EVENTS.FORGOT_PASS,this.forgotPassEvent.bind(this));
        globalEventBus.on(GLOBAL_EVENTS.PROFILE_RETURN,this.profileReturnEvent);
        globalEventBus.on(GLOBAL_EVENTS.PROFILE_CHANGE,this.changeProfileEvent);
        globalEventBus.on(GLOBAL_EVENTS.SAVE_PROFILE,this.profileSaveEvent.bind(this));
        globalEventBus.on(GLOBAL_EVENTS.PASS_CHANGE,this.passChangeEvent);
        globalEventBus.on(GLOBAL_EVENTS.SAVE_PASS,this.passSaveEvent.bind(this));
        globalEventBus.on(GLOBAL_EVENTS.UPLOAD_ATTACH,this.uploadAttach);
        globalEventBus.on(GLOBAL_EVENTS.SEND_MESSAGE,this.sendMessage);
    }

    renderAuthForm() {
        this.elements.authForm = new Form(authController,authTmpl);
        this.elements.authSubmit = new Button(authSubmitController,authSubmitTmpl);
        this.elements.notAccount = new Button(notAccountController,notAccountTmpl);
        const parent = document.querySelector('.window-wrapper');
        parent.classList.add('window-wrapper-active');
        parent.appendChild(this.elements.authForm.getContent());
        const buttonBlock = parent.querySelector(`.${this.elements.authForm.props.buttonBlock.class}`);
        buttonBlock.appendChild(this.elements.authSubmit.getContent());
        buttonBlock.appendChild(this.elements.notAccount.getContent());
    }

    renderRegistrationForm() {
        this.elements.registrationForm = new Form(registrationController,registrationTmpl);
        this.elements.registerSubmit = new Button(registerSubmitController,registerSubmitTmpl);
        this.elements.forgotPass = new Button(forgotPassController,forgotPassTmpl);
        const parent = document.querySelector('.window-wrapper');
        const form = this.elements.registrationForm.getContent();
        form.querySelector('.auth-window-field').classList.remove('auth-window-field_small_padding');
        parent.appendChild(form);
        const buttonBlock = form.querySelector(`.${this.elements.registrationForm.props.buttonBlock.class}`);
        buttonBlock.appendChild(this.elements.registerSubmit.getContent());
        buttonBlock.appendChild(this.elements.forgotPass.getContent())
    }

    renderHeaderButtons() {
        this.elements.favorite = new Button(favoriteController,favoriteTmpl);
        this.elements.personal = new Button(profileController,profileTmpl);
        const parent = document.querySelector('.chats-wrapper__control-panel');
        parent.appendChild(this.elements.favorite.getContent());
        parent.appendChild(this.elements.personal.getContent());
    }

    renderSearchInput() {
        this.elements.search = new Input(searchController,searchTmpl);
        const parent = document.querySelector('.chats-wrapper__search-panel');
        parent.appendChild(this.elements.search.getContent());
    }

    renderChats() {
        this.elements.chats = new List(chatsController,chatsListTmpl);
        const parent = document.querySelector('.chats-wrapper__left-sidebar');
        parent.appendChild(this.elements.chats.getContent());
        this.renderHeaderName();
    }

    renderChatSetting() {
        this.elements.chatSettingButton = new Button(chatSettingsComponentButton,chatSettingsButtonTmpl);
        this.elements.chatSetting = new List(chatSettingsController,chatSettingsTmpl);
        const buttonBlock = document.querySelector('.main-content__header-dropdown');
        const settingsBlock = document.querySelector('.header-dropdown__block');
        const buttonBlockNode = buttonBlock.querySelector(`.${this.elements.chatSettingButton.props.class}`);
        if (buttonBlockNode) {
            buttonBlock.removeChild(buttonBlockNode);
        }
        const settingsBlockNode = settingsBlock.querySelector(`.${this.elements.chatSetting.props.parentTag.class}`);
        if (settingsBlockNode) {
            settingsBlock.removeChild(settingsBlockNode);
        }
        settingsBlock.appendChild(this.elements.chatSetting.getContent());
        buttonBlock.prepend(this.elements.chatSettingButton.getContent());
    }

    renderHeaderName() {
        this.elements.headerName = new Content(headerContentComponent,headerContentTmpl);
        const parent = document.querySelector('.main-content__header-info');
        const node = parent.querySelector(`.${this.elements.headerName.props.class}`)
        if (node) {
            //Удалять элементы плохо, но у меня 0 идей, как это сделать без innerHtml и удаления элементов
            parent.removeChild(node);
        }
        parent.prepend(this.elements.headerName.getContent());
    }

    renderMessages() {
        this.elements.messages = new List(messagesController,messagesTmpl);
        const parent = document.querySelector('.chats-wrapper__main-content');
        const node = parent.querySelector(`.${this.elements.messages.props.parentTag.class}`);
        if (!node) {
            parent.appendChild(this.elements.messages.getContent())
        }
    }

    renderBottomPanel() {
        this.elements.uploadUttach = new Button(uploadAttachController,uploadAttachTmpl);
        this.elements.messageInput = new Input(messageInputController,messageInputTmpl);
        this.elements.sendMessage = new Button(sendMessageController,sendMessageTmpl);
        const parent = document.querySelector('.chats-wrapper__main-content');
        if (!parent.querySelector('.main-content__bottom-panel')) {
            const panel = document.createElement('div');
            panel.classList.add('main-content__bottom-panel');
            panel.appendChild(this.elements.uploadUttach.getContent());
            panel.appendChild(this.elements.messageInput.getContent());
            panel.appendChild(this.elements.sendMessage.getContent());
            parent.appendChild(panel);
        }
    }

    renderProfileReturnButton() {
        this.elements.profileReturn = new Button(profileReturnController,profileReturnTmpl);
        const parent = document.querySelector('.profile-wrapper');
        parent.prepend(this.elements.profileReturn.getContent())
    }

    renderProfileAvatar() {
        this.elements.changeAvatar = new Button(changeAvatarComponent,changeAvatarTmpl);
        const parent = document.querySelector('.profile-wrapper__form-block-middle')
        parent.appendChild(this.elements.changeAvatar.getContent());
    }

    renderProfileHeader() {
        this.elements.profileHeader = new Button(profileHeaderController,profileHeaderTmpl);
        const parent = document.querySelector('.profile-wrapper__form-block-middle');
        parent.appendChild(this.elements.profileHeader.getContent());
    }

    renderProfileForm() {
        this.elements.profileForm = new Form(profileFormController,profileFormTemplate);
        const parent = document.querySelector('.profile-wrapper__form-block-middle');
        parent.appendChild(this.elements.profileForm.getContent());
        this.renderProfileButtons()
    }

    renderProfileButtons() {
        this.elements.changeProfile = new Button(changeProfileController,changeProfileTmpl);
        this.elements.changePass = new Button(changePassController,changePassTmpl);
        this.elements.exitProfile = new Button(exitProfileController,exitProfileTmpl);
        this.elements.saveProfile = new Button(saveProfileController,saveProfileTmpl);
        this.elements.savePass = new Button(savePassController,savePassTmpl);

        const parent = document.querySelector(`.${this.elements.profileForm.props.parentTag.class}`);
        parent.appendChild(this.elements.changeProfile.getContent());
        parent.appendChild(this.elements.changePass.getContent());
        parent.appendChild(this.elements.exitProfile.getContent());
        parent.appendChild(this.elements.saveProfile.getContent());
        parent.appendChild(this.elements.savePass.getContent());
    }

    favoriteEvent({type, chat_id}) {
        const chats = document.querySelectorAll(`.${this.elements.chats.props.parentTag.class} li`);
        chats.forEach(node=>{
            if (node.dataset.id!==chat_id&&type==='show') {
                node.classList.add('chat-list__element-hide')
            } else if (type==='hide') {
                node.classList.remove('chat-list__element-hide');
            }
        })
    }

    profileEvent() {
        const parent = document.querySelector('.profile-wrapper');
        parent.classList.add('profile-wrapper-active')
        if (!parent.querySelector('.profile-wrapper__return')) {
            this.renderProfileReturnButton();
            this.renderProfileAvatar();
            this.renderProfileHeader();
            this.renderProfileForm();
        }
        console.log('Показываем окно профиля')
    }

    profileReturnEvent() {
        document.querySelector('.profile-wrapper').classList.remove('profile-wrapper-active');
    }

    searchEvent() {
        console.log('Показываем результаты поиска')
    }

    chatElementEvent(chat) {
        document.querySelector('.main-content__header-info').classList.remove('main-content__header-info__hide');
        this.state.activeChat = chat;
        this.elements.headerName.setProps({
            name: this.state.activeChat.name
        });
        this.renderHeaderName();
        this.renderChatSetting();
        this.renderMessages();
        this.renderBottomPanel();
        console.log('Показываем чат с активным пользователем')
    }

    notAccountEvent() {
        this.elements.authForm.hide();
        this.renderRegistrationForm();
    }

    forgotPassEvent() {
        document.querySelector('.window-wrapper').classList.remove('window-wrapper-active');
        this.elements.registrationForm.hide();
        this.renderHeaderButtons();
        this.renderSearchInput();
        this.renderChats();
    }

    changeProfileEvent() {
        let elements = document.querySelectorAll('.profile-wrapper-form__element[type="common"]');
        Array.from(elements).forEach(item=>{
            if (item.classList.contains('profile-wrapper-form__element_hide')) item.style.display = 'none';
            if (
                !item.classList.contains('profile-wrapper-form__element_hide') &&
                !item.classList.contains('profile-wrapper-form__element_save')
            ) item.querySelector('.profile-wrapper-form__element-input').setAttribute('contenteditable',true);
            if (item.classList.contains('profile-wrapper-form__element_save')) item.style.display = 'block';
        });
    }

    profileSaveEvent() {
        let elements = document.querySelectorAll('.profile-wrapper-form__element[type="common"] .profile-wrapper-form__element-input');
        let result = {};
        Array.from(elements).forEach(item=>{
            if (item.textContent===''||item.getAttribute('data-placeholder')===item.textContent) {
                result[item.getAttribute('name')] = item.getAttribute('data-placeholder');
            } else {
                result[item.getAttribute('name')] = item.textContent;
            }
        });
        let fields = document.querySelectorAll('.profile-wrapper-form__element[type="common"]');
        Array.from(fields).forEach(item=>{
            if (item.classList.contains('profile-wrapper-form__element_hide')) item.style.display = 'flex';
            if (
                !item.classList.contains('profile-wrapper-form__element_hide') &&
                !item.classList.contains('profile-wrapper-form__element_save')
            ) item.querySelector('.profile-wrapper-form__element-input').setAttribute('contenteditable',false);
            if (item.classList.contains('profile-wrapper-form__element_save')) item.style.display = 'none';
        });
        console.log(result);
    }

    passChangeEvent() {
        let hideElements = document.querySelectorAll('.profile-wrapper-form__element[type="common"]');
        Array.from(hideElements).forEach(item=>{
            item.style.display = 'none';
        });
        let showElements = document.querySelectorAll('.profile-wrapper-form__element[type="password"]');
        Array.from(showElements).forEach(item=>{
            item.style.display = 'flex';
        });
        const btnSave = document.querySelector('.profile-wrapper-form__element_save');
        if (btnSave) {
            btnSave.style.display = 'none';
        }
    }

    passSaveEvent() {

        let hideElements = document.querySelectorAll('.profile-wrapper-form__element[type="common"]');
        Array.from(hideElements).forEach(item=>{
            item.style.display = 'flex';
        });
        let showElements = document.querySelectorAll('.profile-wrapper-form__element[type="password"]');
        Array.from(showElements).forEach(item=>{
            item.style.display = 'none';
        });
        this.elements.saveProfile.hide();
        this.elements.savePass.hide();
    }

    uploadAttach() {

    }

    sendMessage() {

    }
}

const app = new App();

app.init()

// setTimeout(()=>{
//     app.elements.chats.setProps();
// },3000);