import {
	APIInteractionResponse,
	APIApplicationCommandOption,
	APIChatInputApplicationCommandInteraction,
	ApplicationCommandOptionType,
} from 'discord-api-types/v9';

type Narrow<T> =
	// eslint-disable-next-line @typescript-eslint/ban-types
	| (T extends [] ? [] : never)
	| (T extends string | number | bigint | boolean ? T : never)
	| {
			[K in keyof T]: T[K] extends (...args: any[]) => unknown ? T[K] : Narrow<T[K]>;
	  };

type ResolveOption<O extends APIApplicationCommandOption[], Name extends string> = Extract<
	O[number],
	{name: Name}
>['required'] extends true
	? Extract<O[number], {name: Name}>
	: Extract<O[number], {name: Name}> | undefined;

type Options<O extends APIApplicationCommandOption[]> = {
	[K in O[number]['name']]: ResolveOption<O, K>;
};

type SlashCommandContext<O extends APIApplicationCommandOption[]> = {
	interaction: APIChatInputApplicationCommandInteraction;
	options: Options<O>;
};

type SlashCommandHandler<O extends APIApplicationCommandOption[]> = (
	context: SlashCommandContext<O>
) => Promise<APIInteractionResponse>;

type SlashCommandConfig<O extends APIApplicationCommandOption[]> = {
	name: string;
	description: string;
	options: O;
	run: SlashCommandHandler<O>;
};

export function slashCommand<O extends APIApplicationCommandOption[]>(
	config: Narrow<SlashCommandConfig<O>>
) {
	//
}

slashCommand({
	name: 'bruh',
	description: 'brhu ok',
	options: [
		{
			name: 'animal',
			description: 'The type of animal',
			type: ApplicationCommandOptionType.String,
			required: true,
			choices: [
				{
					name: 'Dog',
					value: 'animal_dog',
				},
				{
					name: 'Cat',
					value: 'animal_cat',
				},
				{
					name: 'Penguin',
					value: 'animal_penguin',
				},
			],
		},

		{
			name: 'bruh',
			type: ApplicationCommandOptionType.Subcommand,
			description: 'o0k',
			options: [],
		},

		{
			name: 'only_smol',
			description: 'Whether to show only baby animals',
			type: ApplicationCommandOptionType.Boolean,
			required: true,
		},
	],

	async run(context) {
		context.options.bruh?.options;
	},
});
