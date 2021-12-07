export interface Props {
	command: string;
	description: string;
}

export function SlashCommand(props: Props) {
	return (
		<div className="select-none shadow-lg bg-shark-900 px-3 py-2 rounded-md flex items-center text-white justify-between">
			<div>
				<p className="font-bold">/{props.command}</p>
				<p className="text-sm text-white text-opacity-75">{props.description}</p>
			</div>

			<div>
				<p className="text-sm tracking-tight">StreamTicker</p>
			</div>
		</div>
	);
}

export function SlashCommandStack(props: Props) {
	return (
		<div className="flex flex-col items-center">
			<div className="w-[96%] bg-shark-900 bg-opacity-70 dark:bg-shark-200 dark:bg-opacity-50 h-2 rounded-t-md" />
			<div className="w-[98%] bg-shark-900 bg-opacity-80 dark:bg-shark-200 h-2 rounded-t-md" />
			<div className="w-full">
				<SlashCommand {...props} />
			</div>
		</div>
	);
}
