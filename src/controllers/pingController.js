const PingService = require('../services/pingService');

class PingController {
  static async ping(message) {
    const result = await PingService.ping();

    message.reply(`Pong! Tempo de resposta: ${result}ms`);
  }
}

module.exports = PingController;
