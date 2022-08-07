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

	await logsnag({
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
	await ctx.send({
		embeds: [
			{
				description: `<:icons_Wrong:859388130636988436> ${error.message}`,
				color: 0xed4245,
			},
		],
	});
	await reportError(error, false, ctx.user.id);
});

creator.on('commandBlock', async (command, ctx, reason, data) => {
	await ctx.send({
		embeds: [
			{
				description: `<:icons_warning:908958943466893323> ${reason}`,
				color: 0xfba71b,
			},
		],
	});
});

creator.on('commandRun', async (command, _, ctx) => {
	let options = '\nOptions:\n';

	if (command.options) {
		options += command.options
			.map(option => `${option.name}: ${ctx.options[option.name] as string}`)
			.join('\n');
	} else {
		options += 'none';
	}

	await logsnag({
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
