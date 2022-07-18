import {SlashCommand, SlashCreator, CommandContext} from 'slash-create';
import {getStats} from '../../../server/stats';

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
		const stats = await getStats();
		await ctx.send({
			embeds: [
				{
					title: 'StreamTicker Stats',
					fields: [
						// {
						// 	name: 'Guilds',
						// 	value: stats.guilds.toString(),
						// 	inline: true,
						// },
						{
							name: 'Tickers',
							value: stats.tickers.toString(),
							inline: true,
						},
					],
				},
			],
		});
	}
}
