import Block from "../Block.js";

export default class Input extends Block {
    constructor(props:Record<string, any>,template:string) {
        super(props,template);
    }

    render() {
        if (!Object.keys(this.props.parent).includes('class')) {
            throw new Error('Не найден ключ class');
        }
        const className:string = 'class';
        const parser = new DOMParser();
        const input:Node | null = parser.parseFromString(this.tmpl.compile(this.props),"text/html").querySelector(`.${this.props.parent[className]}`);
        if (input&&Object.keys(this.props).includes('events')) {
            this.props.events.forEach((formEvent:Record<string, any>)=>{
                input.addEventListener(formEvent.type,(event:Event)=>{
                    formEvent.callback(event);
                });
            });
        }
        return input
    }
}