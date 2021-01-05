import Block from "../Block.js";

export default class List extends Block {
    constructor(props:Record<string, any>,template:string) {
        super(props,template);
    }

    render() {
        const parser = new DOMParser();
        const parentList = document.createElement(this.props.parent.name);
        if (!parentList) {
            return;
        }
        parentList.classList.add(this.props.parent.class);
        const className:string = 'class';
        this.props.elements.forEach((chat:Record<string, any>)=>{
            const node:Node | null = parser.parseFromString(this.tmpl.compile(chat),"text/html").querySelector(`.${chat[className]}`);
            if (node) {
                parentList.appendChild(node);
            }
        });
        if (Object.keys(this.props).includes('events')) {
            this.props.events.forEach((formEvent:Record<string, Function>)=>{
                parentList.addEventListener(formEvent.type,(event:Event)=>{
                    formEvent.callback(event);
                });
            });
        }
        return parentList;
    }
}
