const Discord = require('discord.js');

async function createTicket(message, args) {
  const category = message.guild.channels.cache.find(
    (c) => c.name === 'Tickets' && c.type === 'category'
  );
  if (!category) {
    return message.reply('There is no Ticket category in this server.');
  }

  const permissions = [
    {
      id: message.guild.id,
      deny: ['VIEW_CHANNEL'],
    },
    {
      id: message.author.id,
      allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
    },
  ];

  const role = message.guild.roles.cache.find((r) => r.name === args[0]);
  if (!role) {
    return message.reply('This role does not exist in this server.');
  }
  permissions.push({
    id: role.id,
    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
  });

  const ticketChannel = await message.guild.channels.create(`ticket-${message.author.username}`, {
    type: 'text',
    parent: category,
    permissionOverwrites: permissions,
  });

  return ticketChannel;
}

module.exports = { createTicket };
