import axios from 'axios';
import {env} from '../../../server/env';
import type {RobloxGroup, RobloxUser} from './types';

export const RobloxAPI = {
	async getUserIdByUsername(username: string) {
		const {data} = await axios.get<RobloxUser>(
			`https://api.roblox.com/users/get-by-username?username=${username}`
		);

		return data.Id;
	},

	async getUserFollows(id: string) {
		const {data} = await axios.get<{count: number}>(
			`https://friends.roblox.com/v1/users/${id}/followers/count`
		);

		return data.count;
	},

	async getUserFriends(id: string) {
		const {data} = await axios.get<{count: number}>(
			`https://friends.roblox.com/v1/users/${id}/friends/count`
		);

		return data.count;
	},

	async getGroup(id: string) {
		const {data} = await axios.get<RobloxGroup>(`https://groups.roblox.com/v1/groups/${id}`);

		return data;
	},

	async getGroupMembership(id: string) {
		const {data} = await axios.get<RobloxGroup>(`https://groups.roblox.com/v1/groups/${id}`);

		return data.memberCount;
	},
};
