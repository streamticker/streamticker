import {SlashCreator, VercelServer} from 'slash-create';
import {commands} from '../../interactions';
import {env} from '../../server/env';
import {logsnag} from '../../server/logsnag';

export const creator = new SlashCreator({
	applicationID: env.DISCORD_APP_ID,
	publicKey: env.DISCORD_INTERACTION_PUBLIC_KEY,
	token: env.DISCORD_BOT_TOKEN,
});

const server = new VercelServer();

creator.withServer(server).registerCommands(commands);

creator.on('warn', message => console.warn(message));
creator.on('error', error => console.error(error));

creator.on('commandRun', (command, _, ctx) => {
	logsnag.publish({
		channel: 'commands',
		event: 'User ran command',
		icon: '🏃🏻',
		description: `${ctx.user.username}#${ctx.user.discriminator} ran the command ${command.commandName}`,
		tags: {
			command: command.commandName,
			guild: ctx.guildID ? ctx.guildID : 'DM',
			user: ctx.user.id,
		},
		notify: false,
	});
});

creator.on('commandError', (command, error) => {
	console.error(`Command ${command.commandName}:`, error);
});

export default server.vercelEndpoint;
