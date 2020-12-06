import Block from "../Block.js";
import Templator from "../../Templator.js";

export default class List extends Block {
    constructor(props:Record<string, any>,template:string) {
        super(props,template);
    }

    render() {
        const tmpl = new Templator(this.template);
        const parser = new DOMParser();
        const parentList = document.createElement(this.props.parentTag.name);
        parentList.classList.add(this.props.parentTag.class);
        const className:string = 'class';
        this.props.elements.forEach((chat:Record<string, any>)=>{
            const node:Node | null = parser.parseFromString(tmpl.compile(chat),"text/html").querySelector(`.${chat[className]}`);
            if (node) {
                parentList.appendChild(node);
            }
        });
        if (Object.keys(this.props).includes('elementClick')) {
            parentList.addEventListener(this.props.elementClick.type,(event:Event)=>{
                this.props.elementClick.callback(event);
            });
        }
        return parentList;
    }
}
