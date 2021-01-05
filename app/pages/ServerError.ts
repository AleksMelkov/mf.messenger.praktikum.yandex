import Page from "../Page.js";

import Content from "../components/content/Content.js";
import { serverErrorPageTmpl } from "../components/content/serverErrorPage/template.js";
import { serverErrorPageController } from "../components/content/serverErrorPage/controller.js";

enum CONTROLLERS {
    ERROR = 'error-controller',
}

enum ELEMENTS {
    ERROR = 'error'
}

export default class ServerError extends Page {
    protected errorWrapper:HTMLElement|null;

    constructor() {
        super();

        this.title = 'Ошибка';
        this.installTitle();
    }

    protected baseRender() {
        this.errorWrapper = document.querySelector('.error-wrapper')
        if (!this.errorWrapper) {
            this.errorWrapper = document.createElement('div');
            if (this.errorWrapper) this.errorWrapper.classList.add('error-wrapper')
        }
        const body = document.querySelector('body');
        if (body)
            body.appendChild(this.errorWrapper);
    }

    public init() {
        this.baseRender();

        this.errorInit();
    }

    protected errorInit() {
        console.log(111)
        this.mountComponent(CONTROLLERS.ERROR,serverErrorPageController);
        this.addingElement(ELEMENTS.ERROR,Content,CONTROLLERS.ERROR,serverErrorPageTmpl);
        if (this.errorWrapper)
         this.renderAppend(this.errorWrapper,ELEMENTS.ERROR);
    }
}