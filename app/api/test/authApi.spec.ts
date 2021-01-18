import { assert } from 'chai';
import { it } from 'mocha';

import { AuthLogout } from '../authApi';

describe('AuthSignup', () => {
  it('Делаем Logout', () => {
    const logout = new AuthLogout('/auth');
    logout.create().then((res) => {
      if (res.status >= 200 && res.status < 300) {
        assert.isOk('', 'Деавторизация прошла успешно');
      } else if (res.status >= 400 && res.status < 500) {
        const data = JSON.parse(res.responseText);
        assert.equal(data.reason, 'Cookie is not valid', 'Деавторизация прошла успешно');
      }
    });
  });
});
