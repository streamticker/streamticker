import {
	SlashCommand,
	SlashCreator,
	CommandContext,
	ComponentType,
	ButtonStyle,
	CommandOptionType,
	ChannelType,
} from 'slash-create';

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
					channel_types: [ChannelType.GUILD_VOICE],
				},
			],
		});
	}

	async run(ctx: CommandContext) {
		ctx.send({
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
