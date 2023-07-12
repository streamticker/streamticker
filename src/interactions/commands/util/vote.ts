import type {SlashCreator, CommandContext} from 'slash-create';
import {SlashCommand, ComponentType, ButtonStyle} from 'slash-create';

export class VoteCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'vote',
			description: 'Vote for StreamTicker on Top.gg.',
		});
	}

	async run(ctx: CommandContext) {
		await ctx.send({
			embeds: [
				{
					title: 'Vote for StreamTicker on top.gg',
					description:
						'Top.gg is a Discord bot list that people can discover StreamTicker on - voting for us helps us reach more people and lets you create Discord, Twitter and YouTube tickers for 12 hours!',
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
	}
}
