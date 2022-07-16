import axios from 'axios';
import {SlashCommand, SlashCreator, CommandContext, CommandOptionType} from 'slash-create';

export class FeedbackCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'feedback',
			description: 'Send feedback directly to the developers.',
			options: [
				{
					name: 'feedback',
					description: 'The feedback to send',
					required: true,
					type: CommandOptionType.STRING,
				},
			],
			throttling: {
				usages: 1,
				duration: 60,
			},
		});
	}

	async run(ctx: CommandContext) {
		await axios
			.post(
				'https://canary.discord.com/api/webhooks/997683651615662091/psE-cPkGU1qKThPi1zKE6UaGjb39XZ_HZU5pryhBVtQtVlatn7Zhc693VMGoXnhl0sNd',
				{
					embeds: [
						{
							description: ctx.options.feedback,
							author: {
								name: ctx.user.username,
								icon_url: ctx.user.avatarURL,
							},
						},
					],
				}
			)
			.then(() => {
				ctx.send({
					embeds: [
						{
							description: 'Feedback sent!',
						},
					],
				});
			});
	}
}
