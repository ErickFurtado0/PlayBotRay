const DiscordHelper = require('../helpers/discordHelper');

class CreateRoomService {
  static async createRoom(message) {
    const { guild, author } = message;

    const channel = await DiscordHelper.createVoiceChannel(guild, author.username, author);

    return channel;
  }
}

module.exports = CreateRoomService;
