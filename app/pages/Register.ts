import Page from "../Page";

import Form from "../components/forms/Form";
import { registrationTmpl } from "../components/forms/registration/template";
import { registrationController } from "../components/forms/registration/controller";

import Button from "../components/buttons/Button";
import { registerSubmitTmpl } from "../components/buttons/registerSubmit/template";
import { registerSubmitController } from "../components/buttons/registerSubmit/controller";
import { forgotPassTmpl} from "../components/buttons/forgotPass/template";
import { forgotPassController} from "../components/buttons/forgotPass/controller";

enum CONTROLLERS {
    REGISTER = 'register-controller',
    REGISTER_SUBMIT = 'register-submit-controller',
    FORGET_PASS = 'forget-pass-controller',
}
enum ELEMENTS {
    REGISTER = 'register-form',
    REGISTER_SUBMIT = 'register-submit',
    FORGET_PASS = 'forget-pass',
}


export default class Register extends Page {
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

        this.title = 'Регистрация';
        this.installTitle();
    }

    init() {
        this.registerInit();
        this.registerSubmitInit();
        this.forgetPassInit();
    }

    protected renderBase() {

    }

    protected registerInit() {
        this.mountComponent(CONTROLLERS.REGISTER,registrationController);
        this.addingElement(ELEMENTS.REGISTER,Form,CONTROLLERS.REGISTER,registrationTmpl);
        this.renderAppend((this.modalWrapper as HTMLElement),ELEMENTS.REGISTER);
    }

    protected registerSubmitInit() {
        this.mountComponent(CONTROLLERS.REGISTER_SUBMIT,registerSubmitController);
        this.addingElement(ELEMENTS.REGISTER_SUBMIT,Button,CONTROLLERS.REGISTER_SUBMIT,registerSubmitTmpl);
        const registerController = this.getComponent(CONTROLLERS.REGISTER);
        if (registerController) {
            this.renderAppend(`.${registerController.buttonBlock.class}`,ELEMENTS.REGISTER_SUBMIT);
        }
    }

    protected forgetPassInit() {
        this.mountComponent(CONTROLLERS.FORGET_PASS,forgotPassController);
        this.addingElement(ELEMENTS.FORGET_PASS,Button,CONTROLLERS.FORGET_PASS,forgotPassTmpl);
        const registerController = this.getComponent(CONTROLLERS.REGISTER);
        if (registerController) {
            this.renderAppend(`.${registerController.buttonBlock.class}`,ELEMENTS.FORGET_PASS);
        }
    }
}