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
		return this.axios.get<Responses.Command[]>('/commands');
	}

	public async getStats() {
		return this.axios.get<Responses.Stats>('/');
	}
}
