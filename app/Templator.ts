export default class Templator {

    private static TEMPLATE_REGEXP = /\{\{(.*?)\}\}/gi;

    protected _template: string;

    constructor(template: string) {
        this._template = template;
    }

    get(obj: object, path: string, defaultValue: unknown = null): any {
        const keys = path.split('.');
        let result: Record<string, any> = obj;
        for (let key of keys) {
            result = result[key];
            if (result === undefined) {
                return defaultValue;
            }
        }
        return result ?? defaultValue;
    }

    compile(ctx: object) {
        return this._compileTemplate(this._template,ctx);
    }

    _compileTemplate(template:string, ctx:object) {
        this._template = template;
        let stringAr = template.match(Templator.TEMPLATE_REGEXP);
        let tmpl = template;
        if (stringAr) {
            stringAr.forEach((item: string) => {
                let newElement:any = item.replace('{{', '').replace(/\s*/g, '').replace('}}', '');
                if (newElement !== '') {
                    let re = new RegExp(item);
                    if (typeof this.get(ctx, newElement) !== 'function') {
                        tmpl = tmpl.replace(re, this.get(ctx, newElement));
                    } else {
                        window[newElement] = this.get(ctx,newElement);
                        tmpl = tmpl.replace(re, 'window.' + newElement + '()');
                    }
                }
            });
        }
        return tmpl;
    }
}