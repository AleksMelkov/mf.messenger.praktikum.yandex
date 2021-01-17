import Block from "./components/Block";
import { AuthUserInfo } from "./api/authApi";
import Router from "./Router";
import { ROUTE_LIST } from "./routes/routeList";
import EventBus from "./EventBus";
import {GLOBAL_EVENTS} from "./GlobalEvents";
import Store from "./Store";

const router = new Router();
const eventBus = new EventBus();
const userInfo = new AuthUserInfo('/auth');

type Component = Record<string, any>
type asBlock<T> = new ({},template:string) => T;

export default class Page {
    protected _usageComponents:Record<string, Component>;
    protected _elements:Record<string, any>;
    protected title:string;
    protected baseStore:Store;

    constructor() {
        eventBus.on(GLOBAL_EVENTS.CHANGE_ELEMENT_PROPS,this.reRenderElement.bind(this));

        this.baseStore = new Store({
            user:this.userReducer,
            chats:this.chatsReducer,
            user_list:this.userListReducer,
            load:this.loadingReducer,
            password:this.passwordReducer,
        },{
            user: {
                id:'',
                first_name:'',
                second_name:'',
                display_name:'<пусто>',
                login:'',
                avatar:'',
                email:'',
                phone:'',
            },
            password: {
                old_password:'',
                new_password:'',
                repeat_password:''
            },
            load: {
                inProgress: true
            },
            chats:{},
            user_list:[],
        },true);
        this.isAuth();
    }

    public mountComponent(name:string,object:Component) {
        if (object.mount) {
            object.mount();
        }
        this.addingComponent(name,object);
    }

    protected userReducer(state:Record<string, any>, action: { type: string, payload: any }) {
        switch (action.type) {
            case 'GET_USER_INFO': {
                Object.keys(action.payload).forEach((prop:string)=>{
                    if (action.payload[prop]) {
                        state[prop] = action.payload[prop];
                    }
                })
            }
        }
        return state;
    }

    protected userListReducer(state:Record<string, any>, action: { type: string, payload: any }) {
        switch (action.type) {
            case 'ADD_TO_LIST': {
                let displayName = `${action.payload.first_name} ${action.payload.second_name}`;
                if (action.payload.display_name) {
                    displayName = action.payload.display_name
                }
                state[action.payload.id] = displayName;
                break;
            }
            case 'CLEAR_LIST': {
                state = [];
            }
        }
        return state;
    }

    protected chatsReducer(state:Record<string, any>, action: { type: string, payload: any }) {
        switch (action.type) {
            case 'ADD_CHAT_ELEMENT': {
                state.push(action.payload);
                break;
            }
            case 'CLEAR_CHATS': {
                state = [];
                break;
            }
        }

        return state;
    }

    protected passwordReducer(state:Record<string, any>, action: { type: string, payload: any }) {
        switch (action.type) {
            case 'UPDATE_PASSWORD': {
                Object.keys(action.payload).forEach((prop:string)=>{
                    if (action.payload[prop]) {
                        state[prop] += action.payload[prop];
                    }
                })
                break;
            }
            case 'REMOVE_PASSWORDS': {
                Object.keys(action.payload).forEach((prop:string)=>{
                    if (action.payload[prop]) {
                        state[prop] = action.payload[prop];
                    }
                })
                break;
            }
        }
        return state;
    }

    protected loadingReducer(state:Record<string, boolean>, action: { type: string, status:boolean }) {
        switch (action.type) {
            case 'CHANGE_STATUS': {
                state.inProgress = !state.inProgress;
            }
        }
        return state;
    }

    protected isAuth() {
        userInfo.request()
            .then(res=>JSON.parse(res.responseText))
            .then(data=>{
                if (data.reason && data.reason==='Cookie is not valid') {
                    router.go(ROUTE_LIST.AUTH);
                } else {
                    this.baseStore.dispatch({
                        type: "GET_USER_INFO",
                        payload: data
                    });
                }
            }).catch(()=>{
                router.go(ROUTE_LIST.SERVER_ERROR);
        })
    }

    protected installTitle() {
        if (!this.title) {
            throw new Error('Заголовок страницы не установлен');
        }
        document.title = this.title;
    }

    protected addingComponent(name:string,object:Component) {
        if (!this._usageComponents) {
            this._usageComponents = {};
        }
        this._usageComponents[name] = object;
    }

    public getComponent(name:string):Record<string, any>|undefined {
        if (Object.keys(this._usageComponents).length===0) {
            throw new Error('Массив компонентов пуст');
        }
        return this._usageComponents[name];
    }

    public addingElement(name:string,element:asBlock<Block>,componentName:string,template:string) {
        if (!this._elements) {
            this._elements = {};
        }
        const component = this.getComponent(componentName);
        if (!component) {
            return false;
        }
        component.component_name = name;
        this._elements[name] = {block : new element(component,template)};
    }

    public getElement(name:string):Record<string, any> {
        return this._elements[name];
    }

    public setSelectorElement(elementName:string,querySelector:string|HTMLElement) {
        if (!this.getElement(elementName)) {
            return false;
        }
        this.getElement(elementName).querySelector = querySelector;
    }

    protected setAddTypeElement(elementName:string,type:string) {
        if (!this.getElement(elementName)) {
            return false;
        }
        this.getElement(elementName).addingType = type;
    }

    public getElementContent(name:string):Node|boolean {
        if (!this.getElement(name)) {
            return false;
        }
        return this.getElement(name).block.getContent();
    }

    public renderAppend(query:string|HTMLElement,elementName:string) {
        const content = this.getElementContent(elementName);
        let node:HTMLElement|string = query;
        if (typeof query === 'string') {
            node = <HTMLElement>document.querySelector(query);
        }
        if (content&&node) {
            (node as HTMLElement).appendChild(<HTMLElement>content);
            if (typeof node === "object") {
                const className = (node as HTMLElement).classList.item(0);
                if (className) {
                    this.setSelectorElement(elementName,className);
                }
            } else {
                this.setSelectorElement(elementName,node);
            }
            this.setAddTypeElement(elementName,'renderAppend');
        }
    }

    public renderPrepend(query:string|HTMLElement,elementName:string) {
        const content = this.getElementContent(elementName);
        let node:HTMLElement|string = query;
        if (typeof query === 'string') {
            node = <HTMLElement>document.querySelector(query);
        }
        if (content&&node) {
            (node as HTMLElement).prepend(<HTMLElement>content);
            if (typeof node === "object") {
                const className = (node as HTMLElement).classList.item(0);
                if (className) {
                    this.setSelectorElement(elementName,className);
                }
            } else {
                this.setSelectorElement(elementName,node);
            }
            this.setAddTypeElement(elementName,'renderPrepend');
        }
    }

    protected hideElement(elementName:string) {
        if (!this.getElement(elementName)) {
            return false;
        }
        this.getElement(elementName).block.hide();
    }

    protected hideElements() {
        if (Object.keys(this._elements).length===0) {
            throw new Error('Массив элементов пуст');
        }
        Object.values(this._elements).forEach(element=>{
            element.block.hide();
        })
    }

    public removeElement(elementName:string) {
        if (!this.getElement(elementName)) {
            return false;
        }
        const node = document.querySelector(`${this.getElement(elementName).querySelector}`);
        if (node) {
            node.innerHTML = "<!-- -->"
        }
    }

    public removeElements() {
        if (!this._elements||Object.keys(this._elements).length===0) {
            return;
        }
        Object.values(this._elements).forEach(element=>{
            const node = document.querySelector(`.${element.querySelector}`);
            if (node) node.innerHTML = "<!-- -->"
        });
    }

    public showElement(elementName:string) {
        const element = this.getElement(elementName)
        if (!element) {
            return false;
        }
        if (element.addingType==='renderAppend') {
            this.renderAppend(`.${element.querySelector}`,elementName)
        } else if (element.addingType==='renderPrepend') {
            this.renderPrepend(`.${element.querySelector}`,elementName)
        }
    }

    public showElements() {
        if (Object.keys(this._elements).length===0) {
            throw new Error('Массив элементов пуст');
        }
        Object.entries(this._elements).forEach(([key,element])=>{
            if (element.addingType==='renderAppend') {
                this.renderAppend(`.${element.querySelector}`,key)
            } else if (element.addingType==='renderPrepend') {
                this.renderPrepend(`.${element.querySelector}`,key)
            }
        })
    }

    protected reRenderElement(elementName:string,props:Record<string, any>) {
        const element = this.getElement(elementName)
        if (!element) {
            return false;
        }
        element.block.setProps(props);
        (document.querySelector(`.${element.block.props.parent.class}`) as HTMLElement).remove();
        this.showElement(elementName);
    }

    public init() {

    }

    public getData() {
        return new Promise(resolve => {
            resolve(this);
        })
    }
}