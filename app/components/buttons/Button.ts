import Block from '../Block';

export default class Button extends Block {
  constructor(props:Record<string, any>, template:string) {
    super(props, template);
  }

  render() {
    if (Object.keys(this.props).includes('parent')) {
      if (!this.props.parent.class) {
        throw new Error('Родительский элемент обязательно должен иметь класс');
      }
      const className = 'class';
      const parser = new DOMParser();
      const button:Node | null = parser.parseFromString(this.tmpl.compile(this.props), 'text/html').querySelector(`.${this.props.parent[className]}`);
      if (button && Object.keys(this.props).includes('events')) {
        if (!Array.isArray(this.props.events)) {
          throw new Error('Свойство events должно быть массивом');
        }
        this.props.events.forEach((item:Record<string, any>) => {
          button.addEventListener(item.type, (event:Event) => {
            item.callback(event);
          });
        });
      }
      return button;
    }
    return false;
  }
}
