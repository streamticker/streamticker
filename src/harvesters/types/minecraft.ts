export type MinecraftServer = {
	online: boolean;
	ip: string;
	port: number;
	debug: Debug;
	motd: Motd;
	players: Players;
	version: string;
	protocol: number;
	hostname: string;
	icon: string;
	software: string;
	map: string;
	gamemode: string;
	serverid: string;
	plugins: Plugins;
	mods: Plugins;
	info: Motd;
};

type Plugins = {
	names: string[];
	raw: string[];
};

type Players = {
	online: number;
	max: number;
	list: string[];
	uuid: Uuid;
};

type Uuid = {
	Spirit55555: string;
	sarsum33: string;
};

type Motd = {
	raw: string[];
	clean: string[];
	html: string[];
};

type Debug = {
	ping: boolean;
	query: boolean;
	srv: boolean;
	querymismatch: boolean;
	ipinsrv: boolean;
	cnameinsrv: boolean;
	animatedmotd: boolean;
	cachetime: number;
	apiversion: number;
};
