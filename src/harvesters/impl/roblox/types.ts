export interface RobloxUser {
	Id: number;
	Username: string;
	AvatarUri: any;
	AvatarFinal: boolean;
	IsOnline: boolean;
}

export interface RobloxGroup {
	id: number;
	name: string;
	description: string;
	owner: RobloxOwner;
	shout: RobloxShout;
	memberCount: number;
	isBuildersClubOnly: boolean;
	publicEntryAllowed: boolean;
	hasVerifiedBadge: boolean;
}

export interface RobloxOwner {
	buildersClubMembershipType: string;
	hasVerifiedBadge: boolean;
	userId: number;
	username: string;
	displayName: string;
}

export interface RobloxShout {
	body: string;
	poster: RobloxPoster;
	created: string;
	updated: string;
}

export interface RobloxPoster {
	buildersClubMembershipType: string;
	hasVerifiedBadge: boolean;
	userId: number;
	username: string;
	displayName: string;
}
