import Block from "../Block";

export default class Content extends Block {
    constructor(props:Record<string, any>,template:string) {
        super(props,template);
    }

    render() {
        if (!this.props.parent.class) {
            throw new Error('Родительский элемент обязательно должен иметь класс');
        }
        const className:string = 'class';
        const parser = new DOMParser();
        return parser.parseFromString(this.tmpl.compile(this.props),"text/html").querySelector(`.${this.props.parent[className]}`);
    }
}