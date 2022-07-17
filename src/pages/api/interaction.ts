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

const onError = async (error: string | Error) => {
	const c = {
		event: 'Interaction error',
		channel: 'errors',
		description: typeof error === 'string' ? error : JSON.stringify(error.message),
		icon: '🚨',
		tags: {
			'error-name': typeof error === 'string' ? 'n/a' : error.name,
		},
		notify: true,
	};

	console.log(c);

	await logsnag.publish(c).catch(e => {
		console.log(e.response, Object.keys(e));
	});
};

creator.on('warn', onError);
creator.on('error', onError);
creator.on('commandError', (command, error) => onError(error));

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
			options: command.options ? command.options.join(' ') : '',
		},
		notify: false,
	});
});

export default server.vercelEndpoint;
