const Discord = require('discord.js');
const config = require('../config/config');

const client = new Discord.Client();

async function createVoiceChannel(guild, name, user) {
  const category = guild.channels.cache.find(
    (c) => c.name === config.createRoomCategory && c.type === 'category'
  );

  const channel = await guild.channels.create(name, {
    type: 'voice',
    parent: category,
    permissionOverwrites:
    [
        {
        id: guild.roles.everyone.id,
        deny: ['VIEW_CHANNEL'],
        },
        {
        id: user.id,
        allow: ['MANAGE_CHANNELS', 'VIEW_CHANNEL'],
        },
        ],
        });
        
        return channel;
        }
        
        module.exports = {
        client,
        createVoiceChannel,
        };