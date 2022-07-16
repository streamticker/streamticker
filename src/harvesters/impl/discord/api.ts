import {Guild, Role} from 'discord.js';
import {AbstractHarvester} from '../../harvester';

export abstract class DiscordAPI extends AbstractHarvester {
	protected async getBoosts(guild: Guild) {
		const fetched = await guild.fetch();
		return fetched.premiumSubscriptionCount ?? 0;
	}

	protected async getBots(guild: Guild) {
		const allMembers = await guild.members.fetch({force: true});
		const members = allMembers.filter(member => member.user.bot);
		return members.size;
	}

	protected async getHumans(guild: Guild) {
		const allMembers = await guild.members.fetch({force: true});
		const members = allMembers.filter(member => !member.user.bot);
		return members.size;
	}

	protected async getMembers(guild: Guild) {
		const members = await guild.members.fetch({force: true});
		return members.size;
	}

	protected async getRoleMembers(guild: Guild, roleID: string) {
		const members = await guild.members.fetch({force: true});
		const role = await guild.roles.fetch(roleID, {force: true});
		if (!role) throw new Error('Role not found');
		return role.members.size;
	}
}
