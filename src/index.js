const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const config = require('./config/config');
const { client } = require('./helpers/discordHelper');

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync(path.join(__dirname, 'src', 'commands'))
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(__dirname, 'src', 'commands', file));
  client.commands.set(command.name, command);
}

client.on('message', async (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) {
    return;
  }

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);

  if (!command) {
    return;
  }

  try {
    await command.execute({ message, args });
  } catch (error) {
    console.error(error);
    message.reply('Ocorreu um erro ao executar o comando!');
}
});

client.on('voiceStateUpdate', async (oldState, newState) => {
const newUserChannel = newState.channel;
const oldUserChannel = oldState.channel;

if (oldUserChannel === null && newUserChannel !== null) {
const connection = await newUserChannel.join();
connection.play(path.join(__dirname, 'assets', 'audio', 'welcome.mp3'), {
volume: 0.5,
});
} else if (oldUserChannel !== null && newUserChannel === null) {
const connection = await oldUserChannel.join();
connection.play(path.join(__dirname, 'assets', 'audio', 'goodbye.mp3'), {
volume: 0.5,
});
}
});

async function createPanel(message) {
  const roles = message.guild.roles.cache.filter((r) => r.name !== '@everyone');

  const embed = new Discord.MessageEmbed()
    .setTitle('Select a role to start the Ticket')
    .setDescription(
      roles.map((r) => {
        return `${r.toString()} - ${r.name}`;
      })
    );

  const panelMessage = await message.channel.send(embed);

  roles.forEach(async (role) => {
  await panelMessage.react(getEmojiByRole(role.name));
  });
  
  const filter = (reaction, user) => {
  return (
  roles.some((role) => getEmojiByRole(role.name) === reaction.emoji.name) &&
  user.id === message.author.id
  );
  };
  
  const collector = panelMessage.createReactionCollector(filter, { time: 60000 });
  
  collector.on('collect', async (reaction) => {
  const roleName = getRoleByEmoji(reaction.emoji.name);
  const role = message.guild.roles.cache.find((r) => r.name === roleName);

  if (!role) {
    return message.reply('This role does not exist in this server.');
  }
  
  const ticketChannel = await createTicket(message, [roleName]);
  const textChannel = message.guild.channels.cache.find(
    (c) => c.name === 'ticket-text' && c.type === 'text'
  );
  
  if (textChannel) {
    textChannel.send(
      `New Ticket created by ${message.author.toString()} in ${ticketChannel.toString()} with ${role.toString()}`
    );
  }
  
  collector.stop();
  });

collector.on('end', (collected) => {
panelMessage.delete();
});
}

client.on('message', async (message) => {
  if (message.content === '!ticketpanel') {
    await createPanel(message);
  }
});


client.login(config.token);
