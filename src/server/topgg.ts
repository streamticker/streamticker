import axios from 'axios';
import {APIUser} from 'discord-api-types/v10';
import {env} from './env';

export interface TopGGVotes {
	monthlyPoints: number;
	points: number;
}

export class InternalTopggAPI {
	private static readonly headers = {
		Authorization: env.TOPGG_AUTH,
	} as const;

	private readonly clientId;

	constructor(botClientId: string) {
		this.clientId = botClientId;
	}

	public async hasVoted(user: APIUser['id']): Promise<boolean> {
		const request = await axios.get<{voted: number}>(
			`https://top.gg/api/bots/${this.clientId}/check?userId=${user}`,
			{headers: InternalTopggAPI.headers}
		);

		if (!request.data) {
			throw new Error('User not found.');
		}

		return request.data.voted === 1;
	}

	public async getVotes(): Promise<TopGGVotes> {
		const request = await axios.get<TopGGVotes>(`https://top.gg/api/bots/${this.clientId}`, {
			headers: InternalTopggAPI.headers,
		});

		return {monthlyPoints: request.data.monthlyPoints, points: request.data.points};
	}
}
