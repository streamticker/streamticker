// TODO: Eventually rewrite this command
// I don't like the look of it and it should use a dropdown or something. just having a huge list is ugly as fuck

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
					title: `${Object.keys(tickerTypeNames).length} Tickers on StreamTicker`,
					description: Object.entries(tickerDescriptions)
						.map(entry => {
							const [name, desc] = entry as [TickerType, string];
							return `:icons_online: ${tickerTypeNames[name].replace(' (input required)', '')}`;
						})
						.join('\n'),
					color: 0x85ed91,
				},
			],
		});
	}
}
