import { BaseAPI } from './BaseAPI';

export class ChatsApi extends BaseAPI {
  request() {
    return this.http.get('/chats');
  }

  create<T>(args:T) {
    return this.http.post('/chats', {
      data: JSON.stringify(args),
    }, true);
  }

  update<T>(args:T) {
    return this.http.put('/chats/users', {
      data: JSON.stringify(args),
    }, true);
  }

  delete<T>(args:T) {
    return this.http.delete('/chats', {
      data: JSON.stringify(args),
    }, true);
  }
}

export class ChatUsersApi extends BaseAPI {
  request(...args:string[]) {
    const [id] = args;
    return this.http.get(`/${id}/users`);
  }
}

export class ChatNewMsgApi extends BaseAPI {
  request(...args:string[]) {
    const [id] = args;
    return this.http.get(`/new/${id}`);
  }
}
