// import EventBus from "./EventBus";
// import { GLOBAL_EVENTS } from "./GlobalEvents";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import Button from "./components/buttons/Button";
import { favoriteTmpl } from "./components/buttons/favorite/template";
import { favoriteController } from "./components/buttons/favorite/controller";
import { profileTmpl } from "./components/buttons/profile/template";
import { profileController } from "./components/buttons/profile/controller";
import { chatSettingsButtonTmpl } from "./components/buttons/chatSettings/template";
import { chatSettingsComponentButton } from "./components/buttons/chatSettings/component";
import { authSubmitTmpl } from "./components/buttons/authSubmit/template";
import { authSubmitController } from "./components/buttons/authSubmit/controller";
import { notAccountTmpl } from "./components/buttons/notAccount/template";
import { notAccountController } from "./components/buttons/notAccount/controller";
import { registerSubmitTmpl } from "./components/buttons/registerSubmit/template";
import { registerSubmitController } from "./components/buttons/registerSubmit/controller";
import { forgotPassTmpl } from "./components/buttons/forgotPass/template";
import { forgotPassController } from "./components/buttons/forgotPass/controller";
import { profileReturnTmpl } from "./components/buttons/profileReturn/template";
import { profileReturnController } from "./components/buttons/profileReturn/controller";
import { changeAvatarTmpl } from "./components/buttons/changeAvatar/template";
import { changeAvatarComponent } from "./components/buttons/changeAvatar/component";
import { changeProfileTmpl } from "./components/buttons/changeProfile/template";
import { changeProfileController } from "./components/buttons/changeProfile/controller";
import { changePassTmpl } from "./components/buttons/changePass/template";
import { changePassController } from "./components/buttons/changePass/controller";
import { exitProfileTmpl } from "./components/buttons/exitProfile/template";
import { exitProfileController } from "./components/buttons/exitProfile/controller";
import { saveProfileTmpl } from "./components/buttons/saveProfile/template";
import { saveProfileController } from "./components/buttons/saveProfile/controller";
import { savePassTmpl } from "./components/buttons/savePass/template";
import { savePassController } from "./components/buttons/savePass/controller";
import { sendMessageTmpl } from "./components/buttons/sendMessage/template";
import { sendMessageController } from "./components/buttons/sendMessage/component";
import { uploadAttachTmpl } from "./components/buttons/uploadAttach/template";
import { uploadAttachController } from "./components/buttons/uploadAttach/component";
import Input from "./components/inputs/Input";
import { searchTmpl } from "./components/inputs/search/template";
import { searchController } from "./components/inputs/search/controller";
import { messageInputTmpl } from "./components/inputs/messageInput/template";
import { messageInputController } from "./components/inputs/messageInput/controller";
import List from "./components/list/List";
import { chatsListTmpl } from "./components/list/chats/template";
import { chatsController } from "./components/list/chats/controller";
import { chatSettingsTmpl } from "./components/list/chatSettings/template";
import { chatSettingsController } from "./components/list/chatSettings/controller";
import { messagesTmpl } from "./components/list/messages/template";
import { messagesController } from "./components/list/messages/controller";
import Content from "./components/content/Content";
import { headerContentTmpl } from "./components/content/headerContent/template";
import { headerContentComponent } from "./components/content/headerContent/controller";
import { profileHeaderTmpl } from "./components/content/profileHeader/template";
import { profileHeaderController } from "./components/content/profileHeader/controller";
import Form from "./components/forms/Form";
import { authTmpl } from "./components/forms/auth/template";
import { authController } from "./components/forms/auth/controller";
import { registrationTmpl } from "./components/forms/registration/template";
import { registrationController } from "./components/forms/registration/controller";
import { profileFormTemplate } from "./components/forms/profileForm/template";
import { profileFormController } from "./components/forms/profileForm/controller";
import Validator from "./Validator";
// const eventBus = new EventBus();
var App = /** @class */ (function () {
    // protected _eventBus:EventBus;
    function App() {
        this.elements = {};
        this.state = {
            isAuth: false,
            activeChat: {},
            user: {
                common: {},
                password: {},
            },
            formSavePossibility: true,
        };
        this._initEvents();
    }
    App.prototype.init = function () {
        if (!this.state.isAuth) {
            this.renderAuthForm();
        }
        else {
            this.renderHeaderButtons();
            this.renderSearchInput();
            this.renderChats();
        }
    };
    App.prototype._initEvents = function () {
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
    };
    App.prototype.renderAuthForm = function () {
        this.elements.authForm = new Form(authController, authTmpl);
        this.elements.authSubmit = new Button(authSubmitController, authSubmitTmpl);
        this.elements.notAccount = new Button(notAccountController, notAccountTmpl);
        var parent = document.querySelector('.window-wrapper');
        if (!parent) {
            return;
        }
        parent.classList.add('window-wrapper-active');
        parent.appendChild(this.elements.authForm.getContent());
        var buttonBlock = parent.querySelector("." + this.elements.authForm.props.buttonBlock.class);
        if (!buttonBlock) {
            return;
        }
        buttonBlock.appendChild(this.elements.authSubmit.getContent());
        buttonBlock.appendChild(this.elements.notAccount.getContent());
    };
    App.prototype.renderRegistrationForm = function () {
        this.elements.registrationForm = new Form(registrationController, registrationTmpl);
        this.elements.registerSubmit = new Button(registerSubmitController, registerSubmitTmpl);
        this.elements.forgotPass = new Button(forgotPassController, forgotPassTmpl);
        var parent = document.querySelector('.window-wrapper');
        if (!parent) {
            return;
        }
        var form = this.elements.registrationForm.getContent();
        parent.appendChild(form);
        var buttonBlock = form.querySelector("." + this.elements.registrationForm.props.buttonBlock.class);
        buttonBlock.appendChild(this.elements.registerSubmit.getContent());
        buttonBlock.appendChild(this.elements.forgotPass.getContent());
    };
    App.prototype.renderHeaderButtons = function () {
        this.elements.favorite = new Button(favoriteController, favoriteTmpl);
        this.elements.personal = new Button(profileController, profileTmpl);
        var parent = document.querySelector('.chats-wrapper__control-panel');
        if (!parent) {
            return;
        }
        parent.appendChild(this.elements.favorite.getContent());
        parent.appendChild(this.elements.personal.getContent());
    };
    App.prototype.renderSearchInput = function () {
        this.elements.search = new Input(searchController, searchTmpl);
        var parent = document.querySelector('.chats-wrapper__search-panel');
        if (!parent) {
            return;
        }
        parent.appendChild(this.elements.search.getContent());
    };
    App.prototype.renderChats = function () {
        this.elements.chats = new List(chatsController, chatsListTmpl);
        var parent = document.querySelector('.chats-wrapper__left-sidebar');
        if (!parent) {
            return;
        }
        parent.appendChild(this.elements.chats.getContent());
        this.renderHeaderName();
    };
    App.prototype.renderChatSetting = function () {
        this.elements.chatSettingButton = new Button(chatSettingsComponentButton, chatSettingsButtonTmpl);
        this.elements.chatSetting = new List(chatSettingsController, chatSettingsTmpl);
        var buttonBlock = document.querySelector('.main-content__header-dropdown');
        if (!buttonBlock) {
            return;
        }
        var settingsBlock = document.querySelector('.header-dropdown__block');
        if (!settingsBlock) {
            return;
        }
        var buttonBlockNode = buttonBlock.querySelector("." + this.elements.chatSettingButton.props.parent.class);
        if (buttonBlockNode) {
            buttonBlock.removeChild(buttonBlockNode);
        }
        var settingsBlockNode = settingsBlock.querySelector("." + this.elements.chatSetting.props.parent.class);
        if (settingsBlockNode) {
            settingsBlock.removeChild(settingsBlockNode);
        }
        settingsBlock.appendChild(this.elements.chatSetting.getContent());
        buttonBlock.prepend(this.elements.chatSettingButton.getContent());
    };
    App.prototype.renderHeaderName = function () {
        this.elements.headerName = new Content(headerContentComponent, headerContentTmpl);
        var parent = document.querySelector('.main-content__header-info');
        if (!parent) {
            return;
        }
        var node = parent.querySelector("." + this.elements.headerName.props.class);
        if (node) {
            //Удалять элементы плохо, но у меня 0 идей, как это сделать без innerHtml и удаления элементов
            parent.removeChild(node);
        }
        parent.prepend(this.elements.headerName.getContent());
    };
    App.prototype.renderMessages = function () {
        this.elements.messages = new List(messagesController, messagesTmpl);
        var parent = document.querySelector('.chats-wrapper__main-content');
        if (!parent) {
            return;
        }
        var node = parent.querySelector("." + this.elements.messages.props.parent.class);
        if (!node) {
            parent.appendChild(this.elements.messages.getContent());
        }
    };
    App.prototype.renderBottomPanel = function () {
        this.elements.uploadUttach = new Button(uploadAttachController, uploadAttachTmpl);
        this.elements.messageInput = new Input(messageInputController, messageInputTmpl);
        this.elements.sendMessage = new Button(sendMessageController, sendMessageTmpl);
        var parent = document.querySelector('.chats-wrapper__main-content');
        if (!parent) {
            return;
        }
        if (!parent.querySelector('.main-content__bottom-panel')) {
            var panel = document.createElement('div');
            panel.classList.add('main-content__bottom-panel');
            panel.appendChild(this.elements.uploadUttach.getContent());
            panel.appendChild(this.elements.messageInput.getContent());
            panel.appendChild(this.elements.sendMessage.getContent());
            parent.appendChild(panel);
        }
    };
    App.prototype.renderProfileReturnButton = function () {
        this.elements.profileReturn = new Button(profileReturnController, profileReturnTmpl);
        var parent = document.querySelector('.profile-wrapper');
        if (!parent) {
            return;
        }
        parent.prepend(this.elements.profileReturn.getContent());
    };
    App.prototype.renderProfileAvatar = function () {
        this.elements.changeAvatar = new Button(changeAvatarComponent, changeAvatarTmpl);
        var parent = document.querySelector('.profile-wrapper__form-block-middle');
        if (!parent) {
            return;
        }
        parent.appendChild(this.elements.changeAvatar.getContent());
    };
    App.prototype.renderProfileHeader = function () {
        this.elements.profileHeader = new Button(profileHeaderController, profileHeaderTmpl);
        var parent = document.querySelector('.profile-wrapper__form-block-middle');
        if (!parent) {
            return;
        }
        parent.appendChild(this.elements.profileHeader.getContent());
    };
    App.prototype.renderProfileForm = function () {
        this.elements.profileForm = new Form(profileFormController, profileFormTemplate);
        var parent = document.querySelector('.profile-wrapper__form-block-middle');
        if (!parent) {
            return;
        }
        parent.appendChild(this.elements.profileForm.getContent());
        this.renderProfileButtons();
    };
    App.prototype.renderProfileButtons = function () {
        this.elements.changeProfile = new Button(changeProfileController, changeProfileTmpl);
        this.elements.changePass = new Button(changePassController, changePassTmpl);
        this.elements.exitProfile = new Button(exitProfileController, exitProfileTmpl);
        this.elements.saveProfile = new Button(saveProfileController, saveProfileTmpl);
        this.elements.savePass = new Button(savePassController, savePassTmpl);
        var parent = document.querySelector("." + this.elements.profileForm.props.parent.class);
        if (!parent) {
            return;
        }
        parent.appendChild(this.elements.changeProfile.getContent());
        parent.appendChild(this.elements.changePass.getContent());
        parent.appendChild(this.elements.exitProfile.getContent());
        parent.appendChild(this.elements.saveProfile.getContent());
        parent.appendChild(this.elements.savePass.getContent());
    };
    App.prototype.favoriteEvent = function (_a) {
        var type = _a.type, chat_id = _a.chat_id;
        var chats = document.querySelectorAll("." + this.elements.chats.props.parent.class + " li");
        if (!chats) {
            return;
        }
        chats.forEach(function (node) {
            if (node.dataset.id !== chat_id && type === 'show') {
                node.classList.add('chat-list__element-hide');
            }
            else if (type === 'hide') {
                node.classList.remove('chat-list__element-hide');
            }
        });
    };
    App.prototype.profileEvent = function () {
        var parent = document.querySelector('.profile-wrapper');
        if (!parent) {
            return;
        }
        parent.classList.add('profile-wrapper-active');
        if (!parent.querySelector('.profile-wrapper__return')) {
            this.renderProfileReturnButton();
            this.renderProfileAvatar();
            this.renderProfileHeader();
            this.renderProfileForm();
        }
        console.log('Показываем окно профиля');
    };
    App.prototype.profileReturnEvent = function () {
        document.querySelector('.profile-wrapper').classList.remove('profile-wrapper-active');
    };
    App.prototype.searchEvent = function () {
        console.log('Показываем результаты поиска');
    };
    App.prototype.chatElementEvent = function (chat) {
        document.querySelector('.main-content__header-info').classList.remove('main-content__header-info__hide');
        this.state.activeChat = chat;
        this.elements.headerName.setProps({
            text: this.state.activeChat.name
        });
        this.renderHeaderName();
        this.renderChatSetting();
        this.renderMessages();
        this.renderBottomPanel();
        console.log('Показываем чат с активным пользователем');
    };
    App.prototype.notAccountEvent = function () {
        this.elements.authForm.hide();
        this.renderRegistrationForm();
    };
    App.prototype.forgotPassEvent = function () {
        document.querySelector('.window-wrapper').classList.remove('window-wrapper-active');
        this.elements.registrationForm.hide();
        this.renderHeaderButtons();
        this.renderSearchInput();
        this.renderChats();
    };
    App.prototype.changeProfileEvent = function () {
        var elements = document.querySelectorAll('.profile-wrapper-form__element[type="common"]');
        Array.from(elements).forEach(function (item) {
            if (item.classList.contains('profile-wrapper-form__element_hide'))
                item.style.display = 'none';
            if (!item.classList.contains('profile-wrapper-form__element_hide') &&
                !item.classList.contains('profile-wrapper-form__element_save'))
                item.querySelector('.profile-wrapper-form__element-input').setAttribute('contenteditable', 'true');
            if (item.classList.contains('profile-wrapper-form__element_save'))
                item.style.display = 'block';
        });
    };
    App.prototype.profileDataEvent = function (type, name, value) {
        this.state.user[type][name] = value;
        console.log(this.state.user);
    };
    App.prototype.profileSavePossibilityEvent = function (bool) {
        this.state.formSavePossibility = bool;
    };
    App.prototype.profileSaveEvent = function () {
        var error = false;
        Object.entries(this.state.user.common).forEach(function (_a) {
            var _b = __read(_a, 2), key = _b[0], item = _b[1];
            if (!Validator.validate(item, key)) {
                error = true;
                document.querySelector(".profile-wrapper-form__element-input[name=\"" + key + "\"]")
                    .closest('.profile-wrapper-form__element[type="common"]')
                    .style.borderColor = 'red';
            }
        });
        if (!error && this.state.formSavePossibility) {
            var fields = document.querySelectorAll('.profile-wrapper-form__element[type="common"]');
            fields.forEach(function (item) {
                if (item.classList.contains('profile-wrapper-form__element_hide'))
                    item.style.display = 'flex';
                if (!item.classList.contains('profile-wrapper-form__element_hide') &&
                    !item.classList.contains('profile-wrapper-form__element_save'))
                    item.querySelector('.profile-wrapper-form__element-input').setAttribute('contenteditable', 'false');
                if (item.classList.contains('profile-wrapper-form__element_save'))
                    item.style.display = 'none';
            });
            console.log(this.state.user.common);
        }
    };
    App.prototype.passChangeEvent = function () {
        var hideElements = document.querySelectorAll('.profile-wrapper-form__element[type="common"]');
        Array.from(hideElements).forEach(function (item) {
            item.style.display = 'none';
        });
        var showElements = document.querySelectorAll('.profile-wrapper-form__element[type="password"]');
        Array.from(showElements).forEach(function (item) {
            item.style.display = 'flex';
        });
        var btnSave = document.querySelector('.profile-wrapper-form__element_save');
        if (btnSave) {
            btnSave.style.display = 'none';
        }
    };
    App.prototype.passSaveEvent = function () {
        if (this.state.user.password.new_password !== this.state.user.password.repeat_password) {
            document.querySelector('.profile-wrapper-form__element-input[name="repeat_password"]')
                .closest('.profile-wrapper-form__element')
                .style.borderColor = 'red';
        }
        else if (this.state.formSavePossibility) {
            document.querySelector('.profile-wrapper-form__element-input[name="repeat_password"]')
                .closest('.profile-wrapper-form__element')
                .style.borderColor = 'rgb(206, 206, 206)';
            var hideElements = document.querySelectorAll('.profile-wrapper-form__element[type="common"]');
            Array.from(hideElements).forEach(function (item) {
                item.style.display = 'flex';
            });
            var showElements = document.querySelectorAll('.profile-wrapper-form__element[type="password"]');
            Array.from(showElements).forEach(function (item) {
                var input = item.querySelector('.profile-wrapper-form__element-input');
                if (!input) {
                    return;
                }
                input.textContent = '';
                item.style.display = 'none';
            });
            this.elements.saveProfile.hide();
            this.elements.savePass.hide();
        }
    };
    App.prototype.uploadAttach = function () {
    };
    App.prototype.sendMessage = function () {
    };
    return App;
}());
var app = new App();
app.init();
//# sourceMappingURL=app.js.map