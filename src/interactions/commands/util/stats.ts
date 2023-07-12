import {type API, ContainerState, parseSize} from '@onehop/js';
import {stripIndent} from 'common-tags';
import type {CommandContext, SlashCreator} from 'slash-create';
import {SlashCommand} from 'slash-create';
import {HopAPI} from '../../../server/hop';
import {redis} from '../../../server/redis';
import {getStats} from '../../../server/stats';
import {InternalTopggAPI} from '../../../server/topgg';

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

		const deployments = await HopAPI.getAllProjectDeployments();

		const serviceStatus = deployments
			.map(deployment =>
				deployment.containers
					.map((container, index) => {
						const time = `<t:${Math.floor(
							new Date(container.uptime.last_start).getTime() / 1000
						)}:R>`;

						const status =
							container.state === ContainerState.RUNNING
								? '<:icons_dgreen:875710296147255347>'
								: '<:icons_dred:875710295866216509>';

						return `${status} **${servicesMapping[deployment.name]}@${index}** ${time} (mem@${
							container.metrics?.memory_usage_percent ?? 0
						})`;
					})
					.join('\n')
			)
			.join('\n');

		await ctx.send({
			embeds: [
				{
					fields: [
						{
							name: 'Guilds',
							value: `${clientStats?.guilds.toLocaleString() ?? 0}`,
							inline: true,
						},
						{
							name: 'Tickers',
							value: `${tickerStats.total_tickers.toLocaleString()}`,
							inline: true,
						},
						{
							name: 'Votes',
							value: `${voteStats.monthlyPoints.toLocaleString()}`,
							inline: true,
						},
						{
							name: 'Services Status',
							value: serviceStatus,
						},
					],
					footer: {
						text: `${clientStats?.users.toLocaleString() ?? 0} users | ${
							clientStats?.shards ?? 0
						} shards | ${
							voteStats?.points.toLocaleString() ?? 0
						} total votes | 🇺🇸 & 🇬🇧 | Powered by hop.io`,
					},
				},
			],
		});
	}
}

export const servicesMapping: Record<string, string> = {
	streamticker: 'Website & Interactions',
	wadokei: 'Stats API',
	gateway: 'Discord Gateway',
	postgres: 'Database',
};
