import { BaseAPI } from './BaseAPI';

export class AuthSignup extends BaseAPI {
  create<T>(args:T) {
    return this.http.post('/signup', {
      data: JSON.stringify(args),
    }, true);
  }
}

export class AuthSignin extends BaseAPI {
  create<T>(args:T) {
    return this.http.post('/signin', {
      data: JSON.stringify(args),
    }, true);
  }
}

export class AuthUserInfo extends BaseAPI {
  request() {
    return this.http.get('/user');
  }
}

export class AuthLogout extends BaseAPI {
  create() {
    return this.http.post('/logout');
  }
}
