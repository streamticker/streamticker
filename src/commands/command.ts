import {
	APIApplicationCommandOption,
	ApplicationCommandOptionType,
	APIInteractionResponse,
	InteractionResponseType,
	APIApplicationCommand,
	ApplicationCommandType,
	APIInteraction,
} from 'discord-api-types/v9';

type Narrow<T> =
	| (T extends [] ? [] : never)
	| (T extends string | number | bigint | boolean ? T : never)
	| {
			[K in keyof T]: T[K] extends (...args: any[]) => unknown ? T[K] : Narrow<T[K]>;
	  };

export interface Command<T extends ApplicationCommandType, O extends APIApplicationCommandOption> {
	options: O[];
	type: T;
	description: string;
	run(interaction: Extract<APIInteraction, {type: T}>): Promise<APIInteractionResponse>;
}

export type AnyCommand = Command<ApplicationCommandType, APIApplicationCommandOption>;

export function command<T extends ApplicationCommandType, O extends APIApplicationCommandOption>(
	name: string,
	command: Narrow<Omit<Command<T, O>, 'name'>>
) {
	return {...command, name} as AnyCommand;
}

command('bruh', {
	description: 'bruh 2',

	type: ApplicationCommandType.ChatInput,

	options: [
		{
			type: ApplicationCommandOptionType.String,
			name: 'test',
			description: 'The',
			required: true,
		},

		{
			type: ApplicationCommandOptionType.Boolean,
			name: 'ok',
			description: 'bruh',
		},
	],

	async run(i) {
		return {
			type: InteractionResponseType.ChannelMessageWithSource,
			data: {
				content: 'real',
			},
		};
	},
});
