import EventBus from "../app/EventBus.js";

type ObjectType = {
    [key: string]: any;
}

export default class Block{
    static EVENTS = {
        INIT:"init",
        FLOW_CDM:"flow:component-did-mount",
        FLOW_RENDER:"flow:render",
        FLOW_CDU:"flow:component-did-update"
    }

    protected _element:any;

    protected _meta:any;

    protected props:ObjectType;

    protected eventBus:any;

    protected template:string;

    constructor(props:object = {},template:string) {
        const eventBus = new EventBus();

        this._meta = {
            props
        };

        this.props = this._makePropsProxy(props);
        this.template = template;
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    protected _registerEvents(eventBus:EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    public init() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    protected _componentDidMount() {
        this.componentDidMount(this.props);
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidMount(oldProps:object):boolean {
        if (oldProps) {
            return true;
        } else {
            return false;
        }
    }

    protected _componentDidUpdate(oldProps:ObjectType, newProps:ObjectType) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            this._render();
        }
    }

    componentDidUpdate(oldProps:ObjectType, newProps:ObjectType) {
        return Object.keys(oldProps).every(item=>{
            if (item in newProps && oldProps[item]===newProps[item]) {
                return true;
            } else {
                return false;
            }
        });
    }

    setProps = (nextProps:ObjectType):void => {
        if (!nextProps) {
            return;
        }
        let oldProps = Object.assign({},this.props)
        Object.assign(this.props, nextProps);
        this.eventBus().emit(Block.EVENTS.FLOW_CDU,oldProps,nextProps);
    };

    get element() {
        return this._element;
    }

    protected _render() {
        this._element = this.render();
    }

    public render() {

    }

    getContent() {
        return this.element;
    }

    protected _makePropsProxy(props:object) {
        return new Proxy(props,{
            get(target:ObjectType, prop:string) {
                if (prop.startsWith('_')) {
                    throw new Error('Нет доступа');
                } else {
                    if (!Object.keys(target).includes(prop)) {
                        throw new Error(`Отсутствует ключ ${prop}`);
                    }
                    const value = target[prop];
                    return typeof value === "function" ? value.bind(target) : value;
                }
            },

            set(target:ObjectType, prop:string, value) {
                if (prop.startsWith('_')) {
                    throw new Error('Нет доступа');
                } else {
                    target[prop] = value;
                    return true;
                }
            },

            deleteProperty(target:ObjectType, prop:string) {
                if (prop.startsWith('_')) {
                    throw new Error('Нет доступа');
                } else {
                    delete target[prop];
                    return true;
                }
            }
        });
    }

    show() {
        this.getContent().style.display = 'block';
    }

    hide() {
        this.getContent().style.display = 'none';
    }

}