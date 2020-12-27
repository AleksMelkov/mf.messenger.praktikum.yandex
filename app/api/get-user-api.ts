import { BaseAPI } from "./BaseAPI.js";

export class GetUserApi extends BaseAPI {
    request(...args:number[]) {
        const [ id ] = args;
        return this.http.get(`/${id}`);
    }

    create(...args:string[]) {
        const [ login ] = args;
        return this.http.post('/search',{
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                login: login
            })
        })
    }
}