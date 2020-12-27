// import EventBus from "./EventBus.js";
// import { GLOBAL_EVENTS } from "./GlobalEvents.js";

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

import Validator from "./Validator.js";

// const eventBus = new EventBus();

class App {

    protected elements:Record<string, any>;

    protected state:Record<string, any>;

    // protected _eventBus:EventBus;

    constructor() {
        this.elements = {}
        this.state = {
            isAuth:false,
            activeChat:{},
            user:{
                common: {},
                password: {},
            },
            formSavePossibility:true,
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
        // eventBus.on(GLOBAL_EVENTS.FAVORITE,this.favoriteEvent.bind(this));
        // eventBus.on(GLOBAL_EVENTS.PROFILE,this.profileEvent.bind(this));
        // eventBus.on(GLOBAL_EVENTS.SEARCH,this.searchEvent);
        // eventBus.on(GLOBAL_EVENTS.CHAT_ELEMENT,this.chatElementEvent.bind(this));
        // eventBus.on(GLOBAL_EVENTS.TO_REGISTRATION,this.notAccountEvent.bind(this));
        // eventBus.on(GLOBAL_EVENTS.FORGOT_PASS,this.forgotPassEvent.bind(this));
        // eventBus.on(GLOBAL_EVENTS.PROFILE_RETURN,this.profileReturnEvent);
        // eventBus.on(GLOBAL_EVENTS.PROFILE_CHANGE,this.changeProfileEvent);
        // eventBus.on(GLOBAL_EVENTS.SAVE_PROFILE,this.profileSaveEvent.bind(this));
        // eventBus.on(GLOBAL_EVENTS.PASS_CHANGE,this.passChangeEvent);
        // eventBus.on(GLOBAL_EVENTS.SAVE_PASS,this.passSaveEvent.bind(this));
        // eventBus.on(GLOBAL_EVENTS.UPLOAD_ATTACH,this.uploadAttach);
        // eventBus.on(GLOBAL_EVENTS.SEND_MESSAGE,this.sendMessage);
        // eventBus.on(GLOBAL_EVENTS.PROFILE_DATA,this.profileDataEvent.bind(this))
        // eventBus.on(GLOBAL_EVENTS.PROFILE_SAVE_POSSIBILITY,this.profileSavePossibilityEvent.bind(this))
    }

    renderAuthForm() {
        this.elements.authForm = new Form(authController,authTmpl);
        this.elements.authSubmit = new Button(authSubmitController,authSubmitTmpl);
        this.elements.notAccount = new Button(notAccountController,notAccountTmpl);
        const parent:HTMLElement|null = document.querySelector('.window-wrapper');
        if (!parent) {
            return;
        }
        parent.classList.add('window-wrapper-active');
        parent.appendChild(this.elements.authForm.getContent());
        const buttonBlock:HTMLElement|null = parent.querySelector(`.${this.elements.authForm.props.buttonBlock.class}`);
        if (!buttonBlock) {
            return;
        }
        buttonBlock.appendChild(this.elements.authSubmit.getContent());
        buttonBlock.appendChild(this.elements.notAccount.getContent());
    }

    renderRegistrationForm() {
        this.elements.registrationForm = new Form(registrationController,registrationTmpl);
        this.elements.registerSubmit = new Button(registerSubmitController,registerSubmitTmpl);
        this.elements.forgotPass = new Button(forgotPassController,forgotPassTmpl);
        const parent:HTMLElement|null = document.querySelector('.window-wrapper');
        if (!parent) {
            return;
        }
        const form = this.elements.registrationForm.getContent();
        parent.appendChild(form);
        const buttonBlock = form.querySelector(`.${this.elements.registrationForm.props.buttonBlock.class}`);
        buttonBlock.appendChild(this.elements.registerSubmit.getContent());
        buttonBlock.appendChild(this.elements.forgotPass.getContent())
    }

    renderHeaderButtons() {
        this.elements.favorite = new Button(favoriteController,favoriteTmpl);
        this.elements.personal = new Button(profileController,profileTmpl);
        const parent:HTMLElement|null = document.querySelector('.chats-wrapper__control-panel');
        if (!parent) {
            return;
        }
        parent.appendChild(this.elements.favorite.getContent());
        parent.appendChild(this.elements.personal.getContent());
    }

    renderSearchInput() {
        this.elements.search = new Input(searchController,searchTmpl);
        const parent:HTMLElement|null = document.querySelector('.chats-wrapper__search-panel');
        if (!parent) {
            return;
        }
        parent.appendChild(this.elements.search.getContent());
    }

    renderChats() {
        this.elements.chats = new List(chatsController,chatsListTmpl);
        const parent:HTMLElement|null = document.querySelector('.chats-wrapper__left-sidebar');
        if (!parent) {
            return;
        }
        parent.appendChild(this.elements.chats.getContent());
        this.renderHeaderName();
    }

    renderChatSetting() {
        this.elements.chatSettingButton = new Button(chatSettingsComponentButton,chatSettingsButtonTmpl);
        this.elements.chatSetting = new List(chatSettingsController,chatSettingsTmpl);
        const buttonBlock:HTMLElement|null = document.querySelector('.main-content__header-dropdown');
        if (!buttonBlock) {
            return;
        }
        const settingsBlock:HTMLElement|null = document.querySelector('.header-dropdown__block');
        if (!settingsBlock) {
            return;
        }
        const buttonBlockNode:HTMLElement|null = buttonBlock.querySelector(`.${this.elements.chatSettingButton.props.parent.class}`);
        if (buttonBlockNode) {
            buttonBlock.removeChild(buttonBlockNode);
        }
        const settingsBlockNode:HTMLElement|null = settingsBlock.querySelector(`.${this.elements.chatSetting.props.parent.class}`);
        if (settingsBlockNode) {
            settingsBlock.removeChild(settingsBlockNode);
        }
        settingsBlock.appendChild(this.elements.chatSetting.getContent());
        buttonBlock.prepend(this.elements.chatSettingButton.getContent());
    }

    renderHeaderName() {
        this.elements.headerName = new Content(headerContentComponent,headerContentTmpl);
        const parent:HTMLElement|null = document.querySelector('.main-content__header-info');
        if (!parent) {
            return;
        }
        const node:HTMLElement|null = parent.querySelector(`.${this.elements.headerName.props.class}`);
        if (node) {
            //Удалять элементы плохо, но у меня 0 идей, как это сделать без innerHtml и удаления элементов
            parent.removeChild(node);
        }
        parent.prepend(this.elements.headerName.getContent());
    }

    renderMessages() {
        this.elements.messages = new List(messagesController,messagesTmpl);
        const parent:HTMLElement|null = document.querySelector('.chats-wrapper__main-content');
        if (!parent) {
            return;
        }
        const node = parent.querySelector(`.${this.elements.messages.props.parent.class}`);
        if (!node) {
            parent.appendChild(this.elements.messages.getContent())
        }
    }

    renderBottomPanel() {
        this.elements.uploadUttach = new Button(uploadAttachController,uploadAttachTmpl);
        this.elements.messageInput = new Input(messageInputController,messageInputTmpl);
        this.elements.sendMessage = new Button(sendMessageController,sendMessageTmpl);
        const parent:HTMLElement|null = document.querySelector('.chats-wrapper__main-content');
        if (!parent) {
            return;
        }
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
        const parent:HTMLElement|null = document.querySelector('.profile-wrapper');
        if (!parent) {
            return;
        }
        parent.prepend(this.elements.profileReturn.getContent())
    }

    renderProfileAvatar() {
        this.elements.changeAvatar = new Button(changeAvatarComponent,changeAvatarTmpl);
        const parent:HTMLElement|null = document.querySelector('.profile-wrapper__form-block-middle');
        if (!parent) {
            return;
        }
        parent.appendChild(this.elements.changeAvatar.getContent());
    }

    renderProfileHeader() {
        this.elements.profileHeader = new Button(profileHeaderController,profileHeaderTmpl);
        const parent:HTMLElement|null = document.querySelector('.profile-wrapper__form-block-middle');
        if (!parent) {
            return;
        }
        parent.appendChild(this.elements.profileHeader.getContent());
    }

    renderProfileForm() {
        this.elements.profileForm = new Form(profileFormController,profileFormTemplate);
        const parent:HTMLElement|null = document.querySelector('.profile-wrapper__form-block-middle');
        if (!parent) {
            return;
        }
        parent.appendChild(this.elements.profileForm.getContent());
        this.renderProfileButtons()
    }

    renderProfileButtons() {
        this.elements.changeProfile = new Button(changeProfileController,changeProfileTmpl);
        this.elements.changePass = new Button(changePassController,changePassTmpl);
        this.elements.exitProfile = new Button(exitProfileController,exitProfileTmpl);
        this.elements.saveProfile = new Button(saveProfileController,saveProfileTmpl);
        this.elements.savePass = new Button(savePassController,savePassTmpl);

        const parent:HTMLElement|null = document.querySelector(`.${this.elements.profileForm.props.parent.class}`);
        if (!parent) {
            return;
        }
        parent.appendChild(this.elements.changeProfile.getContent());
        parent.appendChild(this.elements.changePass.getContent());
        parent.appendChild(this.elements.exitProfile.getContent());
        parent.appendChild(this.elements.saveProfile.getContent());
        parent.appendChild(this.elements.savePass.getContent());
    }

    favoriteEvent({type, chat_id}:Record<string, string>) {
        const chats:NodeList = document.querySelectorAll(`.${this.elements.chats.props.parent.class} li`);
        if (!chats) {
            return;
        }
        chats.forEach((node:HTMLElement)=>{
            if (node.dataset.id!==chat_id&&type==='show') {
                node.classList.add('chat-list__element-hide')
            } else if (type==='hide') {
                node.classList.remove('chat-list__element-hide');
            }
        })
    }

    profileEvent() {
        const parent:HTMLElement|null = document.querySelector('.profile-wrapper');
        if (!parent) {
            return;
        }
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
        (document.querySelector('.profile-wrapper') as HTMLElement).classList.remove('profile-wrapper-active');
    }

    searchEvent() {
        console.log('Показываем результаты поиска')
    }

    chatElementEvent(chat:Record<string, string>) {
        (document.querySelector('.main-content__header-info') as HTMLElement).classList.remove('main-content__header-info__hide');
        this.state.activeChat = chat;
        this.elements.headerName.setProps({
            text: this.state.activeChat.name
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
        (document.querySelector('.window-wrapper') as HTMLElement).classList.remove('window-wrapper-active');
        this.elements.registrationForm.hide();
        this.renderHeaderButtons();
        this.renderSearchInput();
        this.renderChats();
    }

    changeProfileEvent() {
        let elements = document.querySelectorAll('.profile-wrapper-form__element[type="common"]');
        Array.from(elements).forEach((item:HTMLElement)=>{
            if (item.classList.contains('profile-wrapper-form__element_hide')) item.style.display = 'none';
            if (
                !item.classList.contains('profile-wrapper-form__element_hide') &&
                !item.classList.contains('profile-wrapper-form__element_save')
            ) (item.querySelector('.profile-wrapper-form__element-input') as HTMLElement).setAttribute('contenteditable','true');
            if (item.classList.contains('profile-wrapper-form__element_save')) item.style.display = 'block';
        });
    }

    profileDataEvent(type:string,name:string,value:string) {
        this.state.user[type][name] = value;
        console.log(this.state.user)
    }

    profileSavePossibilityEvent(bool:boolean) {
        this.state.formSavePossibility = bool;
    }

    profileSaveEvent() {
        let error = false;
        Object.entries(this.state.user.common).forEach(([key,item])=>{
            if (!Validator.validate(<string>item,key)) {
                error = true;
                ((document.querySelector(`.profile-wrapper-form__element-input[name="${key}"]`) as HTMLElement)
                    .closest('.profile-wrapper-form__element[type="common"]') as HTMLElement)
                    .style.borderColor = 'red';
            }
        });
        if (!error&&this.state.formSavePossibility) {
            let fields = document.querySelectorAll('.profile-wrapper-form__element[type="common"]');
            fields.forEach((item:HTMLElement)=>{
                if (item.classList.contains('profile-wrapper-form__element_hide')) item.style.display = 'flex';
                if (
                    !item.classList.contains('profile-wrapper-form__element_hide') &&
                    !item.classList.contains('profile-wrapper-form__element_save')
                ) (item.querySelector('.profile-wrapper-form__element-input') as HTMLElement).setAttribute('contenteditable','false');
                if (item.classList.contains('profile-wrapper-form__element_save')) item.style.display = 'none';
            });
            console.log(this.state.user.common);
        }
    }

    passChangeEvent() {
        let hideElements = document.querySelectorAll('.profile-wrapper-form__element[type="common"]');
        Array.from(hideElements).forEach((item:HTMLElement)=>{
            item.style.display = 'none';
        });
        let showElements = document.querySelectorAll('.profile-wrapper-form__element[type="password"]');
        Array.from(showElements).forEach((item:HTMLElement)=>{
            item.style.display = 'flex';
        });
        const btnSave:HTMLElement|null = document.querySelector('.profile-wrapper-form__element_save');
        if (btnSave) {
            btnSave.style.display = 'none';
        }
    }

    passSaveEvent() {
        if (this.state.user.password.new_password!==this.state.user.password.repeat_password) {
            ((document.querySelector('.profile-wrapper-form__element-input[name="repeat_password"]') as HTMLElement)
                .closest('.profile-wrapper-form__element') as HTMLElement)
                .style.borderColor = 'red';
        } else if (this.state.formSavePossibility) {
            ((document.querySelector('.profile-wrapper-form__element-input[name="repeat_password"]') as HTMLElement)
                .closest('.profile-wrapper-form__element') as HTMLElement)
                .style.borderColor = 'rgb(206, 206, 206)';
            const hideElements:NodeList = document.querySelectorAll('.profile-wrapper-form__element[type="common"]');
            Array.from(hideElements).forEach((item:HTMLElement)=>{
                item.style.display = 'flex';
            });
            const showElements = document.querySelectorAll('.profile-wrapper-form__element[type="password"]');
            Array.from(showElements).forEach((item:HTMLElement)=>{
                const input:HTMLElement|null = item.querySelector('.profile-wrapper-form__element-input');
                if (!input) {
                    return;
                }
                input.textContent = '';
                item.style.display = 'none';
            });
            this.elements.saveProfile.hide();
            this.elements.savePass.hide();
        }


    }

    uploadAttach() {

    }

    sendMessage() {

    }
}

const app = new App();

app.init()