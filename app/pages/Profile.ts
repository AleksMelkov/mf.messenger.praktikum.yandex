import Page from "../Page";
import { AuthUserInfo } from "../api/authApi";
import Router from "../Router";
import { ROUTE_LIST } from "../routes/routeList";

import Button from "../components/buttons/Button";
import { profileReturnTmpl} from "../components/buttons/profileReturn/template";
import { profileReturnController} from "../components/buttons/profileReturn/controller";
import { changeAvatarTmpl} from "../components/buttons/changeAvatar/template";
import { changeAvatarComponent} from "../components/buttons/changeAvatar/component";
import { changeProfileTmpl} from "../components/buttons/changeProfile/template";
import { changeProfileController} from "../components/buttons/changeProfile/controller";
import { changePassTmpl} from "../components/buttons/changePass/template";
import { changePassController} from "../components/buttons/changePass/controller";
import { exitProfileTmpl} from "../components/buttons/exitProfile/template";
import { exitProfileController} from "../components/buttons/exitProfile/controller";
import { saveProfileTmpl} from "../components/buttons/saveProfile/template";
import { saveProfileController} from "../components/buttons/saveProfile/controller";
import { savePassTmpl} from "../components/buttons/savePass/template";
import { savePassController} from "../components/buttons/savePass/controller";

import Content from "../components/content/Content";
import { profileHeaderTmpl} from "../components/content/profileHeader/template";
import { profileHeaderController} from "../components/content/profileHeader/controller";

import Form from "../components/forms/Form";
import { profileFormTemplate} from "../components/forms/profileForm/template";
import { profileFormController} from "../components/forms/profileForm/controller";

enum CONTROLLERS {
    PROFILE_RETURN = 'profile-return-controller',
    AVATAR = 'avatar-controller',
    HEADER = 'header-controller',
    FORM = 'form-controller',
    CHANGE_PROFILE = 'change-profile-controller',
    CHANGE_PASS = 'change-pass-controller',
    EXIT_PROFILE = 'exit-profile-controller',
    SAVE_PROFILE = 'save-profile-controller',
    SAVE_PASS = 'save-pass-controller',
}

enum ELEMENTS {
    PROFILE_RETURN = 'profile-return',
    AVATAR = 'avatar',
    HEADER = 'header',
    FORM = 'form',
    CHANGE_PROFILE = 'change-profile',
    CHANGE_PASS = 'change-pass',
    EXIT_PROFILE = 'exit-profile',
    SAVE_PROFILE = 'save-profile',
    SAVE_PASS = 'save-pass',
}

const userInfo = new AuthUserInfo('/auth');
const router = new Router();

export default class Profile extends Page{
    protected profileWrapper:HTMLElement|null;
    protected profileBlock:HTMLElement|null;

    constructor() {
        super();

        this.title = 'Профиль';
        this.installTitle();
    }

    getData(): Promise<unknown> {
        const user = this.baseStore.value.user;
        if (!user.email) {
            return userInfo.request()
                .then(res=>JSON.parse(res.responseText))
                .then(data=>{
                    this.baseStore.dispatch({
                        type: "GET_USER_INFO",
                        payload: data
                    });
                    return new Promise(resolve => {
                        resolve(this);
                    })
                }).catch(()=>{
                    router.go(ROUTE_LIST.SERVER_ERROR)
                })
        }
        return new Promise(resolve => {
            resolve(this);
        })
    }

    init() {
        this.baseRender();

        this.profileReturnInit();
        this.profileAvatarInit();
        this.profileHeaderInit();
        this.profileFormInit();

        this.changeProfileInit();
        this.changePassInit();
        this.exitProfileInit();
        this.saveProfileInit();
        this.savePassInit();
    }

    protected baseRender() {
        this.profileWrapper = document.querySelector('.profile-wrapper');
        if (!this.profileWrapper) {
            this.profileWrapper = document.createElement('div');
            this.profileWrapper.classList.add('profile-wrapper');
        }
        document.body.appendChild(this.profileWrapper);
        const mainFormBlock = document.createElement('main')
        mainFormBlock.classList.add('profile-wrapper__form-block');
        this.profileWrapper.appendChild(mainFormBlock);
        this.profileBlock = document.createElement('div');
        this.profileBlock.classList.add('profile-wrapper__form-block-middle');
        mainFormBlock.appendChild(this.profileBlock);
    }

    protected profileReturnInit() {
        this.mountComponent(CONTROLLERS.PROFILE_RETURN,profileReturnController);
        this.addingElement(ELEMENTS.PROFILE_RETURN,Button,CONTROLLERS.PROFILE_RETURN,profileReturnTmpl);
        this.renderPrepend((this.profileWrapper as HTMLElement),ELEMENTS.PROFILE_RETURN);
    }

    protected profileAvatarInit() {
        this.mountComponent(CONTROLLERS.AVATAR,changeAvatarComponent);
        this.addingElement(ELEMENTS.AVATAR,Button,CONTROLLERS.AVATAR,changeAvatarTmpl);
        this.renderAppend((this.profileBlock as HTMLElement),ELEMENTS.AVATAR);
        const avatarBlock = document.querySelector(`.${changeAvatarComponent.parent.class}`);
        if (this.baseStore.value.user.avatar&&avatarBlock instanceof HTMLDivElement) {
            avatarBlock.querySelector('i')?.remove();
        }
        const input = document.querySelector(`.${changeAvatarComponent.parent.class} input`);
        if (input instanceof HTMLInputElement) {

            input.addEventListener('change',(event)=>{
                if (changeAvatarComponent.methods)
                    changeAvatarComponent.methods.changeAvatar(event)
            })
        }
    }

    protected profileHeaderInit() {
        this.mountComponent(CONTROLLERS.HEADER,profileHeaderController);
        this.addingElement(ELEMENTS.HEADER,Content,CONTROLLERS.HEADER,profileHeaderTmpl);
        this.renderAppend((this.profileBlock as HTMLElement),ELEMENTS.HEADER);
    }

    protected profileFormInit() {
        this.mountComponent(CONTROLLERS.FORM,profileFormController);
        this.addingElement(ELEMENTS.FORM,Form,CONTROLLERS.FORM,profileFormTemplate);
        this.renderAppend((this.profileBlock as HTMLElement),ELEMENTS.FORM);
    }

    protected changeProfileInit() {
        this.mountComponent(CONTROLLERS.CHANGE_PROFILE,changeProfileController);
        this.addingElement(ELEMENTS.CHANGE_PROFILE,Button,CONTROLLERS.CHANGE_PROFILE,changeProfileTmpl);
        this.renderAppend(`.${profileFormController.parent.class}`,ELEMENTS.CHANGE_PROFILE);
    }

    protected changePassInit() {
        this.mountComponent(CONTROLLERS.CHANGE_PASS,changePassController);
        this.addingElement(ELEMENTS.CHANGE_PASS,Button,CONTROLLERS.CHANGE_PASS,changePassTmpl);
        this.renderAppend(`.${profileFormController.parent.class}`,ELEMENTS.CHANGE_PASS);
    }

    protected exitProfileInit() {
        this.mountComponent(CONTROLLERS.EXIT_PROFILE,exitProfileController);
        this.addingElement(ELEMENTS.EXIT_PROFILE,Button,CONTROLLERS.EXIT_PROFILE,exitProfileTmpl);
        this.renderAppend(`.${profileFormController.parent.class}`,ELEMENTS.EXIT_PROFILE);
    }

    protected saveProfileInit() {
        this.mountComponent(CONTROLLERS.SAVE_PROFILE,saveProfileController);
        this.addingElement(ELEMENTS.SAVE_PROFILE,Button,CONTROLLERS.SAVE_PROFILE,saveProfileTmpl);
        this.renderAppend(`.${profileFormController.parent.class}`,ELEMENTS.SAVE_PROFILE);
    }

    protected savePassInit() {
        this.mountComponent(CONTROLLERS.SAVE_PASS,savePassController);
        this.addingElement(ELEMENTS.SAVE_PASS,Button,CONTROLLERS.SAVE_PASS,savePassTmpl);
        this.renderAppend(`.${profileFormController.parent.class}`,ELEMENTS.SAVE_PASS);
    }
}