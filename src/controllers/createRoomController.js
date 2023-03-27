const CreateRoomService = require('../services/createRoomService');

class CreateRoomController {
  static async createRoom(message) {
    const result = await CreateRoomService.createRoom(message);

    message.reply(
      `Sala criada com sucesso! Clique no canal ${result} para acessá-la.`
    );
  }
}

module.exports = CreateRoomController;
