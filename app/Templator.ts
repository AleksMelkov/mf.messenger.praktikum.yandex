export default class Templator {
    private static TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;

    protected template: string;

    constructor(template: string) {
      this.template = template;
    }

    static get(obj: object, path: string, defaultValue: unknown = null): any {
      const keys = path.split('.');
      let result: Record<string, any> = obj;
      for (const key of keys) {
        result = result[key];
        if (result === undefined) {
          return defaultValue;
        }
      }
      return result ?? defaultValue;
    }

    compile(ctx: object) {
      return this.compileTemplate(this.template, ctx);
    }

    compileTemplate(template:string, ctx:object) {
      this.template = template;
      const stringAr = template.match(Templator.TEMPLATE_REGEXP);
      let tmpl = template;
      if (stringAr) {
        stringAr.forEach((item: string) => {
          const newElement:string = item.replace('{{', '').replace(/\s*/g, '').replace('}}', '');
          if (newElement !== '') {
            const re = new RegExp(item);
            if (typeof Templator.get(ctx, newElement) !== 'function') {
              tmpl = tmpl.replace(re, Templator.get(ctx, newElement));
            } else {
              // window[newElement] = this.get(ctx,newElement);
              tmpl = tmpl.replace(re, `window.${newElement}()`);
            }
          }
        });
      }
      return tmpl;
    }
}
