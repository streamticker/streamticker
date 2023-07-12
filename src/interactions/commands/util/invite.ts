import type {SlashCreator, CommandContext} from 'slash-create';
import {SlashCommand, ComponentType, ButtonStyle} from 'slash-create';

export class InviteCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'invite',
			description: 'Invite StreamTicker to your server.',
		});
	}

	async run(ctx: CommandContext) {
		await ctx.send({
			embeds: [
				{
					title: 'Vote for StreamTicker on top.gg',
					description:
						"Invite SteamTicker to your server by clicking on the bot's profile, then clicking on the 'Add to Server' button. Alternatively, you can click below to invite the bot to your server!",
					image: {
						url: 'https://media.discordapp.net/attachments/822168186563854346/916922633965154334/unknown.png',
					},
				},
			],
			components: [
				{
					type: ComponentType.ACTION_ROW,
					components: [
						{
							type: ComponentType.BUTTON,
							label: 'Invite to Server',
							style: ButtonStyle.LINK,
							url: 'https://streamticker.bot/invite',
							emoji: {
								name: '📥',
							},
						},
					],
				},
			],
		});
	}
}
