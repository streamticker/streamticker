import {TickerType} from '@prisma/client';
import {stripIndent} from 'common-tags';
import {SlashCommand, SlashCreator, CommandContext} from 'slash-create';
import {humanize} from '../../../harvesters/harvester';
import {env} from '../../../server/env';
import {HopAPI} from '../../../server/hop';
import {redis} from '../../../server/redis';
import {getStats} from '../../../server/stats';
import {tickerTypeNames} from '../../types/type-names';

const codeblock = (text: string) => `\`\`\`${text}\`\`\``;
export class StatsCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'stats',
			description: 'Gets information about StreamTicker.',
		});
	}

	async run(ctx: CommandContext) {
		await ctx.defer();
		const tickerStats = await getStats();
		const clientStats = await redis.get<{
			users: number;
			guilds: number;
			shards: number;
			totalVotes: number;
			monthlyVotes: number;
		}>('stats:client');

		const containers = await HopAPI.getDeployments();
		await ctx.send({
			embeds: [
				{
					fields: [
						{
							name: 'Bot Stats',
							value: stripIndent`- Users: ${clientStats?.users.toLocaleString()}\n- Guilds: ${clientStats?.guilds.toLocaleString()}\n- Shards: ${
								clientStats?.shards
							}`,
							inline: true,
						},
						{
							name: 'Other Stats',
							value: stripIndent`- Total Votes: ${clientStats?.totalVotes.toLocaleString()}\n- Monthly Votes: ${clientStats?.monthlyVotes.toLocaleString()}\n- Total Tickers: ${tickerStats.total_tickers.toLocaleString()}`,
							inline: true,
						},
						{
							name: 'Services Status',
							value: containers
								.map(
									container =>
										`${
											container.state === 'running'
												? '<:icons_dgreen:875710296147255347>'
												: '<:icons_dred:875710295866216509>'
										} ${servicesMapping[container.name]} ${
											container.state === 'running'
												? `started <t:${Math.floor(new Date(container.uptime).getTime() / 1000)}:R>`
												: 'offline'
										}`
								)
								.join('\n'),
						},
					],
					footer: {
						text: 'made with love in 🇺🇸 & 🇬🇧 - powered by hop.io',
					},
				},
			],
		});
	}
}

export const servicesMapping: Record<string, string> = {
	streamticker: 'StreamTicker (Bot)',
	wadokei: 'Wadokei (Private API)',
	gateway: 'Gateway (Discord API)',
};
