type nodeType = HTMLDivElement|HTMLInputElement;

export default class Validator {

    static validate(node:nodeType|string,type:string) {
        switch (type) {
            case 'phone':
                return Validator.phones(node);
            case 'first_name':
                return Validator.names(node);
            case 'second_name':
                return Validator.names(node);
            case 'display_name':
                return Validator.names(node);
            case 'email':
                return Validator.emails(node);
            case 'login':
                return Validator.logins(node);
            case 'password':
                return Validator.passwords(node);
            case 'old_password':
                return Validator.passwords(node);
            case 'new_password':
                return Validator.passwords(node);
            case 'repeat_password':
                return Validator.passwords(node);
            default:
                throw new Error(`тип поля ${type} не поддерживается валидатором`);
        }
    }

    static phones(value:nodeType|string):boolean {
        const string = typeof value==='string' ? value : Validator.getValue(value);
        return string?.match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/) ? true : false;
    }

    static names(value:nodeType|string):boolean {
        const string = typeof value==='string' ? value : Validator.getValue(value);
        return string?.match(/[а-я]*/) ? true : false;
    }

    static emails(value:nodeType|string):boolean {
        const string = typeof value==='string' ? value : Validator.getValue(value);
        return string?.match(/[a-z]*@[a-z]*\.[a-z]*/) ? true : false;
    }

    static logins(value:nodeType|string):boolean {
        const string = typeof value==='string' ? value : Validator.getValue(value);
        return string?.match(/[/\w]*/) ? true : false;
    }

    static passwords(value:nodeType|string):boolean {
        const string = typeof value==='string' ? value : Validator.getValue(value);
        if (string) {
            return string?.length>6 ? true : false;
        } else {
            return false;
        }
    }

    static getValue(node:nodeType|string) {
        if (node instanceof HTMLDivElement) {
            return node.textContent
        } else if (node instanceof HTMLInputElement) {
            return node.value;
        }
    }
}