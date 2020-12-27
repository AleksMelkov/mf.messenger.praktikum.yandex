import Page from "../Page.js";

import Button from "../components/buttons/Button.js";
import { profileReturnTmpl} from "../components/buttons/profile_return/template.js";
import { profileReturnController} from "../components/buttons/profile_return/controller.js";
import { changeAvatarTmpl} from "../components/buttons/change_avatar/template.js";
import { changeAvatarComponent} from "../components/buttons/change_avatar/component.js";
import { changeProfileTmpl} from "../components/buttons/change_profile/template.js";
import { changeProfileController} from "../components/buttons/change_profile/controller.js";
import { changePassTmpl} from "../components/buttons/change_pass/template.js";
import { changePassController} from "../components/buttons/change_pass/controller.js";
import { exitProfileTmpl} from "../components/buttons/exit_profile/template.js";
import { exitProfileController} from "../components/buttons/exit_profile/controller.js";
import { saveProfileTmpl} from "../components/buttons/save_profile/template.js";
import { saveProfileController} from "../components/buttons/save_profile/controller.js";
import { savePassTmpl} from "../components/buttons/save_pass/template.js";
import { savePassController} from "../components/buttons/save_pass/controller.js";

import Content from "../components/content/Content.js";
import { profileHeaderTmpl} from "../components/content/profile_header/template.js";
import { profileHeaderController} from "../components/content/profile_header/controller.js";

import Form from "../components/forms/Form.js";
import { profileFormTemplate} from "../components/forms/profile_form/template.js";
import { profileFormController} from "../components/forms/profile_form/controller.js";

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

export default class Profile extends Page{
    protected profileWrapper:HTMLElement|null;
    protected profileBlock:HTMLElement|null;

    constructor() {
        super();

        this.title = 'Профиль';
        this.installTitle();
    }

    getData(): Promise<unknown> {
        return new Promise(resolve => {
            if (this.baseStore.value.load.inProgress) {
                resolve(this);
            }
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
        (document.body as HTMLElement).appendChild(this.profileWrapper);
        const mainFormBlock = document.createElement('main')
        mainFormBlock.classList.add('profile-wrapper__form-block');
        (this.profileWrapper as HTMLElement).appendChild(mainFormBlock);
        this.profileBlock = document.createElement('div');
        (this.profileBlock as HTMLElement).classList.add('profile-wrapper__form-block-middle');
        (mainFormBlock as HTMLElement).appendChild(this.profileBlock);
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