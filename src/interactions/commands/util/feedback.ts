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
		await logsnag({
			channel: 'feedback',
			event: 'User sent feedback',
			icon: '💬',
			description: ctx.options.feedback as string,
			tags: {
				user: ctx.user.id,
			},
			notify: true,
		}).then(async () =>
			ctx.send({
				embeds: [
					{
						description:
							"<:icons_bulb:882595243579559958> Feedback sent directly to the developer's phones!",
						color: 0x85ed91,
					},
				],
			})
		);
	}
}
