import test from 'ava';
import configs from '../src/configs';

test('Should be number of max_size', async t => {
  t.is(await typeof configs.max_size, 'number');
});

test('Should be string of default_container_id', async t => {
  t.is(await typeof configs.default_container_id, 'string');
});
