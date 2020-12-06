import Block from "../Block.js";
import Templator from "../../Templator.js";

export default class Input extends Block {
    constructor(props:Record<string, any>,template:string) {
        super(props,template);
    }

    render() {
        const tmpl = new Templator(this.template);
        if (Object.keys(this.props).includes('class')) {
            const className:string = 'class';
            const parser = new DOMParser();
            const input:Node | null = parser.parseFromString(tmpl.compile(this.props),"text/html").querySelector(`.${this.props[className]}`);
            if (input&&Object.keys(this.props).includes('event')) {
                input.addEventListener(this.props.event.type,(event:Event)=>{
                    this.props.event.callback(event);
                });
            }
            return input
        }
    }
}