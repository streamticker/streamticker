import {REST} from '@discordjs/rest';
import type {
	APIChannel,
	RESTPatchAPIChannelJSONBody,
	RESTPatchAPIChannelResult,
	RESTGetAPIGuildMembersResult,
	RESTPostAPIGuildChannelJSONBody,
	RESTPostAPIGuildChannelResult,
	RESTGetAPIGuildResult,
	RESTGetAPIGuildRolesResult,
	RESTGetAPICurrentUserGuildsResult,
} from 'discord-api-types/v10';
import {Routes} from 'discord-api-types/v10';
import {env} from '../../../server/env';

const client = new REST({
	version: '10',
}).setToken(env.DISCORD_BOT_TOKEN);

export class DiscordAPI {
	public static async getBotGuilds(lastId?: string): Promise<RESTGetAPICurrentUserGuildsResult> {
		const limit = 200;

		const query = new URLSearchParams({
			limit: limit.toString(),
		});

		if (lastId) {
			query.set('after', lastId);
		}

		const guilds = (await client.get(Routes.userGuilds(), {
			query,
		})) as RESTGetAPICurrentUserGuildsResult;

		if (guilds.length === limit) {
			const lastId = guilds[guilds.length - 1].id;
			const newGuilds = await DiscordAPI.getBotGuilds(lastId);

			guilds.push(...newGuilds);
		}

		return guilds;
	}

	public static async getGuildMembers(
		guild: string,
		lastId?: string
	): Promise<RESTGetAPIGuildMembersResult> {
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

		if (members.length === limit) {
			const lastId = members[members.length - 1].user?.id;
			const newMembers = await DiscordAPI.getGuildMembers(guild, lastId);

			members.push(...newMembers);
		}

		return members;
	}

	public static async getChannel(id: string) {
		return client.get(Routes.channel(id)) as Promise<APIChannel>;
	}

	public static async createChannel(guild: string, data: RESTPostAPIGuildChannelJSONBody) {
		return client.post(Routes.guildChannels(guild), {
			body: data,
		}) as Promise<RESTPostAPIGuildChannelResult>;
	}

	public static async getGuild(guild: string) {
		return client.get(Routes.guild(guild)) as Promise<RESTGetAPIGuildResult>;
	}

	public static async editChannel(id: string, data: RESTPatchAPIChannelJSONBody) {
		return client.patch(Routes.channel(id), {
			body: data,
		}) as Promise<RESTPatchAPIChannelResult>;
	}

	public static async getRoles(guild: string) {
		return client.get(Routes.guildRoles(guild)) as Promise<RESTGetAPIGuildRolesResult>;
	}
}
