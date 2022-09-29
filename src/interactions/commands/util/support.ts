import type {SlashCreator, CommandContext} from 'slash-create';
import {SlashCommand, ComponentType, ButtonStyle} from 'slash-create';

export class SupportCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'support',
			description: 'Get support for StreamTicker',
		});
	}

	async run(ctx: CommandContext) {
		await ctx.send({
			embeds: [
				{
					description:
						"Join StreamTicker's support server to talk with developers and get help with the bot!",
				},
			],
			components: [
				{
					type: ComponentType.ACTION_ROW,
					components: [
						{
							type: ComponentType.BUTTON,
							label: 'Join Support Server',
							style: ButtonStyle.LINK,
							url: 'discord://discord.gg/gdH3whZ9cj',
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
