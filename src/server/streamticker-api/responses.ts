export type Command = [name: string, description: string];

export interface Stats {
	guilds: number;
	totalTickers: number;
	votes: {
		monthlyPoints: number;
		points: number;
	};
	tickers: string;
}
