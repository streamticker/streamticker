import type {SlashCreator, CommandContext} from 'slash-create';
import {SlashCommand} from 'slash-create';

export class PingCommand extends SlashCommand {
	constructor(creator: SlashCreator) {
		super(creator, {
			name: 'ping',
			description: 'Check if StreamTicker is online.',
		});
	}

	async run(ctx: CommandContext) {
		await ctx.send(':ninja:', {
			ephemeral: true,
		});
	}
}
