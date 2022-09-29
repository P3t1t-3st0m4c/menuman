const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { token } = require('./config.json');
const { reloadCommands } = require('./deploy-commands');

const client = new Client({ intents: [
	GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMembers
] });

client.once('ready', async () => {
	client.user.setPresence({ activities: [{ name: 'Menuman' }], status: 'idle' });
	await reloadCommands()
	console.log("Ready!");

});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

const eventPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventPath, file);
	const event = require(filePath);
	if (event.once) client.once(event.eventString, (...args) => event.execute(...args) )
	else client.on(event.eventString, (...args) => event.execute(...args) )
}

client.login(token);
