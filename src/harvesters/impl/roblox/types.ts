export type RobloxUser = {
	Id: number;
	Username: string;
	AvatarUri: any;
	AvatarFinal: boolean;
	IsOnline: boolean;
};

export type RobloxGroup = {
	id: number;
	name: string;
	description: string;
	owner: RobloxOwner;
	shout: RobloxShout;
	memberCount: number;
	isBuildersClubOnly: boolean;
	publicEntryAllowed: boolean;
	hasVerifiedBadge: boolean;
};

export type RobloxOwner = {
	buildersClubMembershipType: string;
	hasVerifiedBadge: boolean;
	userId: number;
	username: string;
	displayName: string;
};

export type RobloxShout = {
	body: string;
	poster: RobloxPoster;
	created: string;
	updated: string;
};

export type RobloxPoster = {
	buildersClubMembershipType: string;
	hasVerifiedBadge: boolean;
	userId: number;
	username: string;
	displayName: string;
};
