import axios from 'axios';
import {SlashCommand, SlashCreator, CommandContext, CommandOptionType} from 'slash-create';
import {logsnag} from '../../../server/logsnag';

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
		logsnag
			.publish({
				channel: 'feedback',
				event: 'User sent feedback',
				icon: '💬',
				description: ctx.options.feedback,
				tags: {
					user: ctx.user.id,
				},
				notify: true,
			})
			.then(() => {
				ctx.send({
					embeds: [
						{
							description: "Feedback sent directly to the developer's phones!",
						},
					],
				});
			});
	}
}
