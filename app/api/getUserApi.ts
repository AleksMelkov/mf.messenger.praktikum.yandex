import { BaseAPI } from './BaseAPI';

export class GetUserApi extends BaseAPI {
  request(...args:number[]) {
    const [id] = args;
    return this.http.get(`/${id}`);
  }

  create<T>(args:T) {
    return this.http.post('/search', {
      data: JSON.stringify(args),
    }, true);
  }
}
