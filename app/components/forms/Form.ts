import Block from "../Block.js";
import Templator from "../../Templator.js";

export default class Form extends Block {
    constructor(props:Record<string, any>,template:string) {
        super(props,template);
    }

    render() {
        const tmpl = new Templator(this.template);
        const parser = new DOMParser();
        const form = document.createElement(this.props.parentTag.name);
        const className:string = 'elementClass';
        form.classList.add(this.props.parentTag.class);
        if (Object.keys(this.props).includes('header')) {
            const formHeader = document.createElement('div');
            formHeader.classList.add(this.props.header.class);
            formHeader.textContent = this.props.header.text;
            form.appendChild(formHeader);
        }
        this.props.fields.forEach((field:Record<string, any>)=>{
            const node:Node | null = parser.parseFromString(tmpl.compile(field),"text/html").querySelector(`.${field[className]}`);
            if (node) {
                form.appendChild(node);
            }
        });
        if (Object.keys(this.props).includes('buttonBlock')) {
            const buttonBlock = document.createElement('div');
            buttonBlock.classList.add(this.props.buttonBlock.class);
            form.appendChild(buttonBlock);
        }
        if (Object.keys(this.props).includes('formEvents')) {
            this.props.formEvents.forEach((formEvent:Record<string, Function>)=>{
                form.addEventListener(formEvent.type,(event:Event)=>{
                    formEvent.callback(event);
                })
            })

        }
        return form;
    }
}