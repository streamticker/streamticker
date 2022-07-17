import {REST} from '@discordjs/rest';
import {
	APIChannel,
	Routes,
	RESTPatchAPIChannelJSONBody,
	RESTPatchAPIChannelResult,
	RESTGetAPIGuildMembersResult,
	RESTGetAPIGuildMembersQuery,
} from 'discord-api-types/v10';
import {env} from '../../../server/env';

const client = new REST({version: '10'}).setToken(env.DISCORD_BOT_TOKEN);

export class DiscordAPI {
	public static async getGuildMemberCount(guild: string, lastId?: string): Promise<number> {
		const limit = 1000;

		const query = new URLSearchParams({
			limit: limit.toString(),
		});

		if (lastId) {
			query.set('after', lastId);
		}

		const members = (await client.get(Routes.guildMembers(guild), {
			query,
		})) as RESTGetAPIGuildMembersResult;

		let count = members.length;

		if (members.length === limit) {
			const newMembers = await this.getGuildMemberCount(
				guild,
				members[members.length - 1].user?.id
			);

			count += newMembers;
		}

		return count;
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
