import {TickerType} from '@prisma/client';
import {stripIndent} from 'common-tags';
import {SlashCommand, SlashCreator, CommandContext} from 'slash-create';
import {humanize} from '../../../harvesters/harvester';
import {env} from '../../../server/env';
import {HopAPI} from '../../../server/hop';
import {redis} from '../../../server/redis';
import {getStats} from '../../../server/stats';
import {InternalTopggAPI} from '../../../server/topgg';
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
		}>('stats:client');

		const voteStats = await new InternalTopggAPI('822117936251928586').getVotes();

		const containers = await HopAPI.getDeployments();
		await ctx.send({
			embeds: [
				{
					fields: [
						{
							name: 'Bot Stats',
							value: stripIndent`- Users: ${clientStats?.users.toLocaleString() ?? 0}\n- Guilds: ${
								clientStats?.guilds.toLocaleString() ?? 0
							}\n- Shards: ${clientStats?.shards}`,
							inline: true,
						},
						{
							name: 'Other Stats',
							value: stripIndent`- Total Votes: ${
								voteStats.points.toLocaleString() ?? 0
							}\n- Monthly Votes: ${
								voteStats.monthlyPoints.toLocaleString() ?? 0
							}\n- Total Tickers: ${tickerStats.total_tickers.toLocaleString()}`,
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
