import { BaseAPI } from './BaseAPI';

export class GetToken extends BaseAPI {
  create<T>(args:T) {
    return this.http.post(`/chats/token/${args}`);
  }
}
