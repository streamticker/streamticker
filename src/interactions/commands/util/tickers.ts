import {TickerType} from '@prisma/client';
import {SlashCommand, SlashCreator, CommandContext} from 'slash-create';
import {tickerDescriptions, tickerTypeNames} from '../../types/type-names';

export class TickersListCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'tickers',
			description: 'Prints available tickers and their descriptions.',
		});
	}

	async run(ctx: CommandContext) {
		await ctx.send({
			embeds: [
				{
					description: Object.entries(tickerDescriptions)
						.map(entry => {
							const [name, desc] = entry as [TickerType, string];
							return `**\`${tickerTypeNames[name].replace(' (input required)', '')}\`**:\n${desc}`;
						})
						.join('\n\n'),
				},
			],
		});
	}
}
