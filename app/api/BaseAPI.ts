import HTTPTransport from "../HTTPTransport.js";
import { baseApiUrl } from "../baseApiUrl.js";

export class BaseAPI {
    public http:HTTPTransport;

    constructor(url:string='') {
        this.http = new HTTPTransport(baseApiUrl+url);
    }

    create<T>(args:T) { throw new Error('Not implemented '+args); }

    request() { throw new Error('Not implemented'); }

    update<T>(args:T) { throw new Error('Not implemented'+args); }

    delete<T>(args:T) { throw new Error('Not implemented'+args); }
}