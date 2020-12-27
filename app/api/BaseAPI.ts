import HTTPTransport from "../HTTPTransport.js";

export class BaseAPI {
    readonly http:HTTPTransport;

    constructor(url:string='') {
        const baseUrl = 'https:/ya-praktikum.tech/api/v2';
        this.http = new HTTPTransport(baseUrl+url);
    }

    create() { throw new Error('Not implemented'); }

    request() { throw new Error('Not implemented'); }

    update() { throw new Error('Not implemented'); }

    delete() { throw new Error('Not implemented'); }
}