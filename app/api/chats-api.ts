import { BaseAPI } from "./BaseAPI.js";

export class ChatsApi extends BaseAPI {
    request() {
        return this.http.get('/chats');
    }

    create() {
        const [ title ] = arguments;
        return this.http.post('/chats',JSON.stringify({
            title:title,
        }));
    }

    delete() {
        const [ chatId ] = arguments;
        return this.http.delete('/chats',JSON.stringify({
            chatId:chatId
        }))
    }
}

export class ChatUsersApi extends BaseAPI {
    request(...args:string[]) {
        const [ id ] = args;
        return this.http.get(`/${id}/users`);
    }
}

export class ChatNewMsgApi extends BaseAPI {
    request(...args:string[]) {
        const [ id ] = args;
        return this.http.get(`/new/${id}`);
    }
}