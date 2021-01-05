import Page from "../Page.js";

import Form from "../components/forms/Form.js";
import { authTmpl} from "../components/forms/auth/template.js";
import { authController} from "../components/forms/auth/controller.js";

import Button from "../components/buttons/Button.js";
import { authSubmitTmpl} from "../components/buttons/authSubmit/template.js";
import { authSubmitController} from "../components/buttons/authSubmit/controller.js";
import { notAccountTmpl} from "../components/buttons/notAccount/template.js";
import { notAccountController} from "../components/buttons/notAccount/controller.js";

enum CONTROLLERS {
    AUTH = 'auth-controller',
    AUTH_SUBMIT = 'auth-submit-controller',
    NOT_ACCOUNT = 'not-account-controller',
}

enum ELEMENTS {
    AUTH = 'auth-form',
    AUTH_SUBMIT = 'auth-submit',
    NOT_ACCOUNT = 'not-account',
}

export default class Auth extends Page {
    protected modalWrapper:HTMLElement|null;

    constructor() {
        super();
        this.modalWrapper = document.querySelector('.window-wrapper');
        if (!this.modalWrapper) {
            this.modalWrapper = document.createElement('div');
            this.modalWrapper.classList.add('window-wrapper');
            const body = document.querySelector('body');
            (body as HTMLElement).prepend(this.modalWrapper);
        }

        this.title = 'Авторизация';
        this.installTitle();
    }

    public init() {
        this.authInit();
        this.authSubmitInit();
        this.notAccountInit();
    }

    protected authInit() {
        this.mountComponent(CONTROLLERS.AUTH,authController);
        this.addingElement(ELEMENTS.AUTH,Form,CONTROLLERS.AUTH,authTmpl);
        this.renderAppend((this.modalWrapper as HTMLElement),ELEMENTS.AUTH);
    }

    protected authSubmitInit() {
        this.mountComponent(CONTROLLERS.AUTH_SUBMIT,authSubmitController);
        this.addingElement(ELEMENTS.AUTH_SUBMIT,Button,CONTROLLERS.AUTH_SUBMIT,authSubmitTmpl);
        const authController = this.getComponent(CONTROLLERS.AUTH);
        if (authController) {
            this.renderAppend(`.${authController.buttonBlock.class}`,ELEMENTS.AUTH_SUBMIT);
        }
    }

    protected notAccountInit() {
        this.mountComponent(CONTROLLERS.NOT_ACCOUNT,notAccountController);
        this.addingElement(ELEMENTS.NOT_ACCOUNT,Button,CONTROLLERS.NOT_ACCOUNT,notAccountTmpl);
        const authController = this.getComponent(CONTROLLERS.AUTH);
        if (authController) {
            this.renderAppend(`.${authController.buttonBlock.class}`,ELEMENTS.NOT_ACCOUNT);
        }
    }
}