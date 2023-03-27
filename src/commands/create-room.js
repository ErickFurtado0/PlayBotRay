const CreateRoomController = require('../controllers/createRoomController');
const Message = require('../models/message');

module.exports = {
  name: 'create-room',
  description: 'Cria uma nova sala de voz',
  async execute(messageData) {
    const message = new Message(messageData);
    await CreateRoomController.createRoom(message);
  },
};
