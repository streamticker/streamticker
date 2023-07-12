export type TikTokUser = {
	userInfo: UserInfo;
	seoProps: SeoProps;
};

export type UserInfo = {
	id: string;
	shortId: string;
	uniqueId: string;
	nickname: string;
	avatarLarger: string;
	avatarMedium: string;
	avatarThumb: string;
	signature: string;
	createTime: number;
	verified: boolean;
	secUid: string;
	ftc: boolean;
	relation: number;
	openFavorite: boolean;
	bioLink: BioLink;
	commentSetting: number;
	duetSetting: number;
	stitchSetting: number;
	privateAccount: boolean;
	secret: boolean;
	isADVirtual: boolean;
	roomId: string;
	isUnderAge18: boolean;
	uniqueIdModifyTime: number;
	ttSeller: boolean;
	extraInfo: ExtraInfo;
	stats?: Stats;
	itemList: ItemList[];
};

export type BioLink = {
	link: string;
	risk: number;
};

export type ExtraInfo = {
	statusCode: number;
};

export type Stats = {
	followerCount: number;
	followingCount: number;
	heart: number;
	heartCount: number;
	videoCount: number;
	diggCount: number;
	needFix: boolean;
};

export type ItemList = {
	id: string;
	desc: string;
	createTime: string;
	scheduleTime: number;
	video: Video;
	author: string;
	music: Music;
	challenges: Challenge[];
	stats: Stats3;
	duetInfo: DuetInfo;
	warnInfo: any[];
	originalItem: boolean;
	officalItem: boolean;
	textExtra: TextExtra[];
	secret: boolean;
	forFriend: boolean;
	digged: boolean;
	itemCommentStatus: number;
	showNotPass: boolean;
	vl1: boolean;
	takeDown: number;
	itemMute: boolean;
	effectStickers: EffectSticker[];
	authorStats: AuthorStats;
	privateItem: boolean;
	duetEnabled: boolean;
	stitchEnabled: boolean;
	stickersOnItem: StickersOnItem[];
	isAd: boolean;
	shareEnabled: boolean;
	comments: any[];
	duetDisplay: number;
	stitchDisplay: number;
	indexEnabled: boolean;
	adAuthorization: boolean;
	adLabelVersion: number;
	locationCreated: string;
	nickname: string;
	authorId: string;
	authorSecId: string;
	avatarThumb: string;
	creatorCaptionsURLs?: string[];
	diversificationLabels?: string[];
};

export type Video = {
	id: string;
	height: number;
	width: number;
	duration: number;
	ratio: string;
	cover: string;
	originCover: string;
	dynamicCover: string;
	playAddr: string;
	downloadAddr: string;
	shareCover: string[];
	reflowCover: string;
	bitrate: number;
	encodedType: string;
	format: string;
	videoQuality: string;
	encodeUserTag: string;
	codecType: string;
	definition: string;
	subtitleInfos: SubtitleInfo[];
};

export type SubtitleInfo = {
	LanguageID: string;
	LanguageCodeName: string;
	Url: string;
	UrlExpire: string;
	Format: string;
	Version: string;
	Source: string;
	VideoSubtitleID: number;
	Size: string;
};

export type Music = {
	id: string;
	title: string;
	playUrl: string;
	coverLarge: string;
	coverMedium: string;
	coverThumb: string;
	authorName: string;
	original: boolean;
	duration: number;
	album: string;
	scheduleSearchTime: number;
};

export type Challenge = {
	id: string;
	title: string;
	desc: string;
	profileLarger: string;
	profileMedium: string;
	profileThumb: string;
	coverLarger: string;
	coverMedium: string;
	coverThumb: string;
	isCommerce: boolean;
	stats: Stats2;
};

export type Stats2 = {
	videoCount: number;
	viewCount: number;
};

export type Stats3 = {
	diggCount: number;
	shareCount: number;
	commentCount: number;
	playCount: number;
};

export type DuetInfo = {
	duetFromId: string;
};

export type TextExtra = {
	awemeId: string;
	start: number;
	end: number;
	hashtagId: string;
	hashtagName: string;
	type: number;
	subType: number;
	userId: string;
	isCommerce: boolean;
	userUniqueId: string;
	secUid: string;
	questionId?: string;
	questionContent?: string;
};

export type EffectSticker = {
	name: string;
	ID: string;
};

export type AuthorStats = {
	followerCount: number;
	followingCount: number;
	heart: number;
	heartCount: number;
	videoCount: number;
	diggCount: number;
};

export type StickersOnItem = {
	stickerText: string[];
	stickerType: number;
};

export type SeoProps = {
	metaParams: MetaParams;
};

export type MetaParams = {
	title: string;
	keywords: string;
	description: string;
	canonicalHref: string;
	robotsContent: string;
	applicableDevice: string;
};
