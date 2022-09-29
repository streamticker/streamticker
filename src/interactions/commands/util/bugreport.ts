import {stripIndents} from 'common-tags';
import type {SlashCreator, CommandContext} from 'slash-create';
import {SlashCommand} from 'slash-create';
import {linear} from '../../../server/linear';
import {logsnag} from '../../../server/logsnag';

export class BugReportCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'bugreport',
			description: 'Report a bug directly to the developers.',
			throttling: {
				usages: 1,
				duration: 86_400, // 24 hours
			},
		});
	}

	async run(ctx: CommandContext) {
		await ctx.sendModal(
			{
				title: 'StreamTicker Bug Report',
				custom_id: 'cool_modal',
				components: [
					{
						type: 1,
						components: [
							{
								type: 4,
								custom_id: 'bug',
								label: 'What happened?',
								style: 1,
								min_length: 20,
								max_length: 1000,
								placeholder: 'Give us a short description of the bug.',
								required: true,
							},
						],
					},
					{
						type: 1,
						components: [
							{
								type: 4,
								custom_id: 'description',
								label: 'What were you doing?',
								style: 2,
								min_length: 50,
								max_length: 4000,
								placeholder: 'Tell us what happened in as much detail as possible.',
								required: true,
							},
						],
					},
				],
			},
			async ctx => {
				await linear
					.issueCreate({
						title: ctx.values.bug,
						description: stripIndents`__**User Information**__
                        - User: ${ctx.member?.user.username}#${ctx.member?.user.discriminator}
                        - ID: ${ctx.member?.user.id}

                        __**Guild Information**__
                        - Guild ID: ${ctx.guildID}

                        __**Bug Description**__
                        ${ctx.values.description}`,
						teamId: 'a83f5bde-ac6f-4886-bd40-dd3c7d3069e7',
						labelIds: ['dad96daf-46c1-4c49-ba7c-4b6bd00ad40f'],
					})
					.then(async issue => {
						if (issue.success) {
							const issueIdentifier = (await issue.issue)?.identifier;

							if (!issueIdentifier) {
								throw new Error('The issue was created but no identifier was found.');
							}

							await ctx.send({
								embeds: [
									{
										description:
											'<:icons_Bugs:859388130803974174> Thank you so much for your report! Your bug has been submitted to the developers. We will look into it as soon as possible!',
										footer: {
											text: `For more information, reach out to the developers using /support and mention issue ID ${issueIdentifier}.`,
										},
										color: 0x85ed91,
									},
								],
							});
						}
					});
			}
		);
	}
}
