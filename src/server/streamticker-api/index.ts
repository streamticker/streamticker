import axios, {AxiosInstance} from 'axios';
import * as Responses from './responses';

export {Responses};

export class StreamTickerAPI {
	private readonly axios: AxiosInstance;

	constructor(public readonly endpoint: string) {
		this.axios = axios.create({
			baseURL: endpoint,
		});
	}

	public async getCommands() {
		const {data: commands} = await this.axios.get<Responses.Command[]>('/commands');
		return commands;
	}

	public async getStats() {
		const {data: stats} = await this.axios.get<Responses.Stats>('/');
		return stats;
	}
}
