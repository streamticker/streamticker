import {
	ApplicationCommandOptionType,
	APIInteractionResponse,
	InteractionResponseType,
	APIInteraction,
	ApplicationCommandType,
	RESTPutAPIApplicationCommandsJSONBody,
} from 'discord-api-types/v9';

type Narrow<T> =
	// eslint-disable-next-line @typescript-eslint/ban-types
	| (T extends [] ? [] : never)
	| (T extends string | number | bigint | boolean ? T : never)
	| {
			[K in keyof T]: T[K] extends (...args: any[]) => unknown ? T[K] : Narrow<T[K]>;
	  };

export type StreamTickerInteraction<T extends ApplicationCommandType> = Extract<
	RESTPutAPIApplicationCommandsJSONBody[number],
	{type?: T}
> & {
	run(interaction: Extract<APIInteraction, {type: T}>): Promise<APIInteractionResponse>;
};

export type AnyInteraction = StreamTickerInteraction<ApplicationCommandType>;

export function interaction<T extends ApplicationCommandType>(data: StreamTickerInteraction<T>) {
	return data as AnyInteraction;
}

interaction({
	type: ApplicationCommandType.User,
});

interaction({
	type: ApplicationCommandType.ChatInput,

	description: 'ok',

	name: 'ok',

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
