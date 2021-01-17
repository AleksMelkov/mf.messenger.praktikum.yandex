import Block from "../Block";

export default class Form extends Block {
    constructor(props:Record<string, any>,template:string) {
        super(props,template);
    }

    render() {
        const parser = new DOMParser();
        const form = document.createElement(this.props.parent.name);
        if (!form) {
            return;
        }
        const className:string = 'elementClass';
        form.classList.add(this.props.parent.class);
        if (Object.keys(this.props).includes('header')) {
            const formHeader = document.createElement('div');
            if (!formHeader) {
                return
            }
            formHeader.classList.add(this.props.header.class);
            formHeader.textContent = this.props.header.text;
            form.appendChild(formHeader);
        }
        this.props.elements.forEach((field:Record<string, any>)=>{
            const node:Node | null = parser.parseFromString(this.tmpl.compile(field),"text/html").querySelector(`.${field[className]}`);
            if (node) {
                form.appendChild(node);
            }
        });
        if (Object.keys(this.props).includes('buttonBlock')) {
            const buttonBlock = document.createElement('div');
            if (!buttonBlock) {
                return;
            }
            buttonBlock.classList.add(this.props.buttonBlock.class);
            form.appendChild(buttonBlock);
        }
        if (Object.keys(this.props).includes('events')) {
            this.props.events.forEach((formEvent:Record<string, Function>)=>{
                form.addEventListener(formEvent.type,(event:Event)=>{
                    formEvent.callback(event);
                })
            })

        }
        return form;
    }
}