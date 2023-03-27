const { ping } = require('../src/controllers/ping');

test('ping function should return "pong"', () => {
  const message = { reply: jest.fn() };
  ping(message);

  expect(message.reply).toHaveBeenCalledWith('pong');
});
