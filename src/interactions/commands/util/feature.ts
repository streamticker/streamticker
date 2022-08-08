import {stripIndents} from 'common-tags';
import {SlashCommand, SlashCreator, CommandContext} from 'slash-create';
import {linear} from '../../../server/linear';
import {logsnag} from '../../../server/logsnag';

export class FeatureCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'feature',
			description: 'Request a StreamTicker feature!',
			throttling: {
				usages: 1,
				duration: 86_400, // 24 hours
			},
		});
	}

	async run(ctx: CommandContext) {
		await ctx.sendModal(
			{
				title: 'StreamTicker Feature Request',
				custom_id: 'feature_modal',
				components: [
					{
						type: 1,
						components: [
							{
								type: 4,
								custom_id: 'feature',
								label: 'What would you like to see on StreamTicker?',
								style: 2,
								min_length: 10,
								max_length: 4000,
								placeholder: 'Describe to us what you would like to see in StreamTicker.',
								required: true,
							},
						],
					},
				],
			},
			async ctx => {
				await linear
					.issueCreate({
						title: ctx.values.feature,
						description: stripIndents`__**User Information**__
                        - User: ${ctx.member?.user.username}#${ctx.member?.user.discriminator}
                        - ID: ${ctx.member?.user.id}

                        __**Guild Information**__
                        - Guild ID: ${ctx.guildID}

                        __**Feature Description**__
                        ${ctx.values.feature}`,
						teamId: 'a83f5bde-ac6f-4886-bd40-dd3c7d3069e7',
						labelIds: ['008becda-8c85-42de-b738-de01c97252ca'],
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
											'<:icons_bookmark:860123644037824512> Thank you so much for your feature request. We will look into it as soon as possible!',
										footer: {
											text: `For more information, reach out to the developers using /support and mention request ID ${issueIdentifier}.`,
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
