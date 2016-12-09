import test from 'ava';
import configs from '../src/configs';

test('test configs', async t => {
  t.is(await typeof configs.max_size, 'number');

  t.is(await typeof configs.default_container_id, 'string');
});
