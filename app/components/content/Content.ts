import Block from "../Block.js";

export default class Content extends Block {
    constructor(props:Record<string, any>,template:string) {
        super(props,template);
    }

    render() {
        if (!Object.keys(this.props.parent).includes('class')) {
            throw new Error('Не найден ключ class');
        }
        const className:string = 'class';
        const parser = new DOMParser();
        return parser.parseFromString(this.tmpl.compile(this.props),"text/html").querySelector(`.${this.props.parent[className]}`);
    }
}