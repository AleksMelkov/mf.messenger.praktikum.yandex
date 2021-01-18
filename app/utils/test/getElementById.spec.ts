import { assert } from 'chai';

import { it } from 'mocha';
import { getElementById } from '../getElementById';

describe('getElementById', () => {
  const array = [
    {
      id: 'pb6m8452xemf',
      class: 'chat-list__element',
      logo: 'https://sun1-17.userapi.com/impf/c848632/v848632779/1b774f/NVelhWIfl3c.jpg?size=200x0&quality=96&crop=0,0,1440,1440&sign=8a29ad1f3c8eeda59abf90663fb9a3da&ava=1',
      name: 'Иван',
      preview: 'Привет! Как дела? Придешь сегодня на учебу?',
      time: '16:20',
      show: 'true',
      count: 1,
    },
    {
      id: 'c76r0u8xij8a',
      class: 'chat-list__element',
      logo: 'https://sun1-47.userapi.com/impf/c639218/v639218214/34408/YouiYm102AI.jpg?size=100x0&quality=96&crop=1008,558,554,554&sign=cf151ba66bd3380b185826761ff9266a&ava=1',
      name: 'Анатолий',
      preview: 'Перезвони мне, очень надо!',
      time: '15:20',
      show: 'true',
      count: 2,
    },
  ];

  it('Ищем элемент массива - идентично', () => {
    assert.deepEqual(getElementById('pb6m8452xemf', array)[0], array[0], 'Найден не тот элемент массива');
  });

  it('Ищем элемент массива - не идентично', () => {
    assert.notDeepEqual(getElementById('pb6m8452xemf', array)[0], array[1], 'Вернуло не то');
  });
});
