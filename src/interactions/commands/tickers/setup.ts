import {TickerType} from '@prisma/client';
import {ChannelType, PermissionFlagsBits} from 'discord-api-types/v10';
import type {SlashCreator, CommandContext} from 'slash-create';
import {SlashCommand} from 'slash-create';
import {harvesters} from '../../../harvesters';
import {DiscordAPI} from '../../../harvesters/impl/discord/api';
import {env} from '../../../server/env';
import {prisma} from '../../../server/prisma';
import {defaultTickerFormats} from '../../types/type-names';

export class SetupCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'setup',
			description: 'Setup StreamTicker in your server.',
			requiredPermissions: ['MANAGE_CHANNELS'],
		});
	}

	async run(ctx: CommandContext) {
		await ctx.defer(true);

		if (!ctx.guildID) {
			throw new Error('This command needs to be ran in a guild!');
		}

		const category = await DiscordAPI.createChannel(ctx.guildID, {
			type: ChannelType.GuildCategory,
			name: 'Server Stats',
			permission_overwrites: [
				{
					id: ctx.guildID,
					deny: PermissionFlagsBits.Connect.toString(),
					type: 0,
				},
				{
					id: env.DISCORD_APP_ID,
					allow: PermissionFlagsBits.Connect.toString(),
					type: 1,
				},
			],
		});

		const promises = [
			TickerType.DISCORD_MEMBERS,
			TickerType.DISCORD_HUMANS,
			TickerType.DISCORD_BOTS,
			TickerType.DISCORD_BOOSTS,
		].map(async type => {
			if (!ctx.guildID) {
				throw new Error('This command needs to be ran in a guild!');
			}

			const channel = await DiscordAPI.createChannel(ctx.guildID, {
				type: ChannelType.GuildVoice,
				parent_id: category.id,
				name: 'Loading...',
			});

			const ticker = await prisma.ticker.create({
				data: {
					platform_id: null,
					guild_id: ctx.guildID,
					channel_id: channel.id,
					type,
					format: defaultTickerFormats[type],
				},
			});

			const harvester = harvesters[type];
			await harvester.harvest(ticker);

			return ticker;
		});

		await Promise.all(promises);
		await ctx.send({
			embeds: [
				{
					description: `<:icons_update:860123644297871382> Successfully created 4 tickers! Check under the category \`Server Stats\` to see them.`,
					color: 0x85ed91,
				},
			],
		});
	}
}
