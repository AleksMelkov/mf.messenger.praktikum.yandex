import Block from "../Block.js";
import Templator from "../../Templator.js";

export default class Content extends Block {
    constructor(props:Record<string, any>,template:string) {
        super(props,template);
    }

    render() {
        const tmpl = new Templator(this.template);
        if (Object.keys(this.props).includes('class')) {
            const className:string = 'class';
            const parser = new DOMParser();
            return parser.parseFromString(tmpl.compile(this.props),"text/html").querySelector(`.${this.props[className]}`);
        }
    }
}