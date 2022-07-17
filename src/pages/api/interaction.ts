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

const reportError = async (error: string | Error, notify = true, userId?: string) => {
	const tags: Record<string, string> = {
		'error-name': typeof error === 'string' ? 'n/a' : error.name,
	};

	if (userId) {
		tags.user = userId;
	}

	await logsnag.publish({
		event: 'Interaction error',
		channel: 'errors',
		description: typeof error === 'string' ? error : JSON.stringify(error.message),
		icon: '🚨',
		tags,
		notify,
	});
};

creator.on('warn', reportError);
creator.on('error', reportError);

creator.on('commandError', async (command, error, ctx) => {
	ctx.send(error.message);
	await reportError(error, false, ctx.user.id);
});

creator.on('commandRun', (command, _, ctx) => {
	let options = '\nOptions:\n';

	if (command.options) {
		options += command.options
			.map(option => {
				return `${option.name}: ${ctx.options[option.name]}`;
			})
			.join('\n');
	}

	logsnag.publish({
		channel: 'commands',
		event: 'User ran command',
		icon: '🏃🏻',
		description: `${ctx.user.username}#${ctx.user.discriminator} ran the command ${command.commandName}\n${options}`,
		tags: {
			command: command.commandName,
			guild: ctx.guildID ? ctx.guildID : 'DM',
			user: ctx.user.id,
		},
		notify: false,
	});
});

export default server.vercelEndpoint;
