const { createTicket } = require('../services/ticketService');

module.exports = {
  name: 'ticket',
  description: 'Create a new ticket',
  async execute(message, args) {
    const ticketChannel = await createticket(message, args);
    message.reply(`Your ticket channel has been created: ${ticketChannel}`);
  },
};
