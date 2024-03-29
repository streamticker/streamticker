import {TickerType} from '@prisma/client';
import type {SlashCreator, CommandContext, ApplicationCommandOptionChoice} from 'slash-create';
import {
	SlashCommand,
	CommandOptionType,
	ChannelType,
	ComponentType,
	ButtonStyle,
	Permissions,
} from 'slash-create';
import {harvesters} from '../../../harvesters';
import {TickerRequirement} from '../../../harvesters/harvester';
import {DiscordAPI} from '../../../harvesters/impl/discord/api';
import {logsnag} from '../../../server/logsnag';
import {prisma} from '../../../server/prisma';
import {redis} from '../../../server/redis';
import {InternalTopggAPI} from '../../../server/topgg';
import {defaultTickerFormats, serviceTitles, tickerTypeNames} from '../../types/type-names';
import {is, enumerate} from '../../util';

export class CreateCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'create',
			description: 'Create a ticker.',
			options: [
				{
					name: 'channel',
					description: 'The voice channel to bind to',
					required: true,
					type: CommandOptionType.CHANNEL,
					channel_types: [ChannelType.GUILD_VOICE, ChannelType.GUILD_STAGE_VOICE],
				},
				// {
				// 	name: 'type',
				// 	description: 'The type of ticker to create',
				// 	required: true,
				// 	type: CommandOptionType.STRING,
				// 	choices: Object.entries(tickerTypeNames).map<ApplicationCommandOptionChoice>(entry => {
				// 		const [value, name] = entry;
				// 		return {name, value};
				// 	}),
				// },
				{
					name: 'platform',
					description: 'What platform you want data from',
					required: true,
					type: CommandOptionType.STRING,
					choices: Object.entries(serviceTitles).map<ApplicationCommandOptionChoice>(entry => {
						const [value, name] = entry;
						return {name, value};
					}),
				},
				{
					name: 'ticker',
					description: 'The ticker to create',
					required: true,
					type: CommandOptionType.STRING,
					autocomplete: true,
				},
				{
					name: 'input',
					description: 'Any input required for the ticker',
					required: false,
					type: CommandOptionType.STRING,
				},
				{
					name: 'shorten',
					description:
						'Shorten the ticker value from the full number to a shorter version (e.g. 1,000,000 to 1M)',
					required: false,
					type: CommandOptionType.BOOLEAN,
				},
			],
			requiredPermissions: ['MANAGE_CHANNELS'],
		});
	}

	async run(ctx: CommandContext) {
		await ctx.defer();

		const permissions = new Permissions(ctx.appPermissions);
		const hasAdmin = permissions.any(0x0000000000000008);

		if (!hasAdmin) {
			throw new Error(
				'StreamTicker does not have permission to manage tickers. Please [reinvite the bot](https://streamticker.bot/invite) with the correct permissions to create tickers.'
			);
		}

		if (!ctx.guildID) {
			throw new Error('This command can only be ran inside of a guild!');
		}

		if (!is(ctx.options.ticker, enumerate(TickerType))) {
			throw new Error('Invalid ticker type!');
		}

		const existingOnChannel = await prisma.ticker.findFirst({
			where: {channel_id: ctx.options.channel as string},
		});

		if (existingOnChannel) {
			throw new Error('A ticker already exists on this channel!');
		}

		const harvester = harvesters[ctx.options.ticker];

		if (harvester.disabled?.disabled) {
			throw new Error(harvester.disabled.reason);
		}

		if (
			harvester.requirement === TickerRequirement.VOTE &&
			ctx.data.application_id === '822117936251928586'
		) {
			const hasUserVoted = await new InternalTopggAPI('822117936251928586').hasVoted(ctx.user.id);
			if (!hasUserVoted) {
				await ctx.send({
					embeds: [
						{
							description: `<:icons_Wrong:859388130636988436> Hi there! To create a ${tickerTypeNames[
								ctx.options.ticker as TickerType
							].replace(
								' (input required)',
								''
							)} ticker, you'll need to vote for the bot on Top.gg. It's a super easy process and takes about 30 seconds - it supports us directly & allows you to make super cool tickers! Please click the button below to vote for the bot!`,
							color: 0xed4245,
						},
					],
					components: [
						{
							type: ComponentType.ACTION_ROW,
							components: [
								{
									type: ComponentType.BUTTON,
									label: 'Click to vote!',
									style: ButtonStyle.LINK,
									url: 'https://top.gg/bot/822117936251928586/vote',
									emoji: {
										name: '🎉',
									},
								},
							],
						},
					],
				});
				return;
			}
		}

		let platformId: string | null = null;

		if (harvester.validateInput) {
			const result = await harvester.validateInput(ctx.options.input, ctx.guildID);

			if (result.success) {
				platformId = result.platform_id;
			} else {
				throw new Error(result.message);
			}
		}

		const ticker = await prisma.ticker.create({
			data: {
				channel_id: ctx.options.channel as string,
				guild_id: ctx.guildID,
				type: ctx.options.ticker,
				refresh_after: new Date(),
				format: defaultTickerFormats[ctx.options.ticker],
				platform_id: platformId,
				truncate: ctx.options.shorten as boolean,
			},
		});

		await harvester.harvest(ticker);

		await ctx.send({
			embeds: [
				{
					description: `<:icons_Correct:859388130411282442> Successfully created your ticker <#${ticker.channel_id}>!`,
					footer: {
						text: 'Tip: You can customize the ticker by using /format!',
					},
					color: 0x85ed91,
				},
			],
		});

		await logsnag({
			channel: 'tickers',
			event: 'User created ticker',
			icon: '🆕',
			description: `${ctx.user.username}#${ctx.user.discriminator} created a ticker at ${
				ctx.guildID
			} ${ctx.options.input ? `with input ${ctx.options.input as string}` : ''}`,
			tags: {
				ticker: ctx.options.type as TickerType,
				guild: ctx.guildID,
				channel: ctx.options.channel as string,
				user: ctx.user.id,
			},
			notify: true,
		});
	}
}
