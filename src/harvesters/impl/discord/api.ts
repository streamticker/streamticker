import {REST} from '@discordjs/rest';
import {
	APIChannel,
	Routes,
	RESTPatchAPIChannelJSONBody,
	RESTPatchAPIChannelResult,
} from 'discord-api-types/v10';
import {env} from '../../../server/env';

const client = new REST({version: '10'}).setToken(env.DISCORD_BOT_TOKEN);

export class DiscordAPI {
	public static async getGuildMemberCount(guild: string, lastId?: string): Promise<number> {
		return 0;
	}

	public static getChannel(id: string) {
		return client.get(Routes.channel(id)) as Promise<APIChannel>;
	}

	public static editChannel(id: string, data: RESTPatchAPIChannelJSONBody) {
		return client.patch(Routes.channel(id), {
			body: data,
		}) as Promise<RESTPatchAPIChannelResult>;
	}
}
