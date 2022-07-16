export const DiscordAPI = {
	async getBoosts(guild: Guild) {
		const fetched = await guild.fetch();
		return fetched.premiumSubscriptionCount ?? 0;
	},

	async getBots(guild: Guild) {
		const allMembers = await guild.members.fetch({force: true});
		const members = allMembers.filter(member => member.user.bot);
		return members.size;
	},

	async getHumans(guild: Guild) {
		const allMembers = await guild.members.fetch({force: true});
		const members = allMembers.filter(member => !member.user.bot);
		return members.size;
	},

	async getMembers(guild: string) {
		//
	},

	async getRoleMembers(guild: Guild, roleID: string) {
		const members = await guild.members.fetch({force: true});
		const role = await guild.roles.fetch(roleID, {force: true});
		if (!role) throw new Error('Role not found');
		return role.members.size;
	},
};
