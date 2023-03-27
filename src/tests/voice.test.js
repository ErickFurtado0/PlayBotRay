const { joinVoiceChannel } = require('../src/services/voice');

test('joinVoiceChannel function should join the voice channel and play audio', async () => {
  const channel = { join: jest.fn().mockResolvedValueOnce({ play: jest.fn() }) };
  await joinVoiceChannel(channel);

  expect(channel.join).toHaveBeenCalled();
  expect(channel.join.mock.calls[0][0]).toEqual({ timeout: 2000 });
  expect(channel.join.mock.calls[0][1]).toEqual({ deaf: true });
});
