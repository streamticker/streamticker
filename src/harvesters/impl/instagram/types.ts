export interface InstagramUser {
	data: Data;
	status: string;
}

interface Data {
	user: User3;
}

interface User3 {
	biography: string;
	bio_links: any[];
	biography_with_entities: Biographywithentities;
	blocked_by_viewer: boolean;
	restricted_by_viewer: boolean;
	country_block: boolean;
	external_url: string;
	external_url_linkshimmed: string;
	edge_followed_by: Edgefollowedby;
	fbid: string;
	followed_by_viewer: boolean;
	edge_follow: Edgefollowedby;
	follows_viewer: boolean;
	full_name: string;
	group_metadata?: any;
	has_ar_effects: boolean;
	has_clips: boolean;
	has_guides: boolean;
	has_channel: boolean;
	has_blocked_viewer: boolean;
	highlight_reel_count: number;
	has_requested_viewer: boolean;
	hide_like_and_view_counts: boolean;
	id: string;
	is_business_account: boolean;
	is_eligible_to_view_account_transparency: boolean;
	is_professional_account: boolean;
	is_supervision_enabled: boolean;
	is_guardian_of_viewer: boolean;
	is_supervised_by_viewer: boolean;
	is_supervised_user: boolean;
	is_embeds_disabled: boolean;
	is_joined_recently: boolean;
	guardian_id?: any;
	business_address_json?: any;
	business_contact_method: string;
	business_email?: any;
	business_phone_number?: any;
	business_category_name?: any;
	overall_category_name?: any;
	category_enum?: any;
	category_name: string;
	is_private: boolean;
	is_verified: boolean;
	edge_mutual_followed_by: Edgemutualfollowedby;
	profile_pic_url: string;
	profile_pic_url_hd: string;
	requested_by_viewer: boolean;
	should_show_category: boolean;
	should_show_public_contacts: boolean;
	state_controlled_media_country?: any;
	location_transparency_country?: any;
	transparency_label?: any;
	transparency_product: string;
	username: string;
	connected_fb_page?: any;
	pronouns: any[];
	edge_felix_video_timeline: Edgefelixvideotimeline;
	edge_owner_to_timeline_media: Edgeownertotimelinemedia;
	edge_saved_media: Edgefelixvideotimeline;
	edge_media_collections: Edgefelixvideotimeline;
}

interface Edgeownertotimelinemedia {
	count: number;
	page_info: Pageinfo2;
	edges: Edge4[];
}

interface Edge4 {
	node: Node4;
}

interface Node4 {
	__typename: string;
	id: string;
	shortcode: string;
	dimensions: Dimensions;
	display_url: string;
	edge_media_to_tagged_user: Edgemediatotaggeduser;
	fact_check_overall_rating?: any;
	fact_check_information?: any;
	gating_info?: any;
	sharing_friction_info: Sharingfrictioninfo;
	media_overlay_info?: any;
	media_preview?: any;
	owner: Owner;
	is_video: boolean;
	has_upcoming_event: boolean;
	accessibility_caption: string;
	edge_media_to_caption: Edgemediatocaption;
	edge_media_to_comment: Edgefollowedby;
	comments_disabled: boolean;
	taken_at_timestamp: number;
	edge_liked_by: Edgefollowedby;
	edge_media_preview_like: Edgefollowedby;
	location?: Location;
	nft_asset_info?: any;
	thumbnail_src: string;
	thumbnail_resources: Thumbnailresource[];
	coauthor_producers: any[];
	pinned_for_users: Pinnedforuser[];
	edge_sidecar_to_children: Edgesidecartochildren;
}

interface Edgesidecartochildren {
	edges: Edge3[];
}

interface Edge3 {
	node: Node3;
}

interface Node3 {
	__typename: string;
	id: string;
	shortcode: string;
	dimensions: Dimensions;
	display_url: string;
	edge_media_to_tagged_user: Edgemediatotaggeduser2;
	fact_check_overall_rating?: any;
	fact_check_information?: any;
	gating_info?: any;
	sharing_friction_info: Sharingfrictioninfo;
	media_overlay_info?: any;
	media_preview: string;
	owner: Owner;
	is_video: boolean;
	has_upcoming_event: boolean;
	accessibility_caption?: string | string;
	dash_info?: Dashinfo;
	has_audio?: boolean;
	tracking_token?: string;
	video_url?: string;
	video_view_count?: number;
}

interface Dashinfo {
	is_dash_eligible: boolean;
	video_dash_manifest?: any;
	number_of_qualities: number;
}

interface Edgemediatotaggeduser2 {
	edges: Edge[];
}

interface Pinnedforuser {
	id: string;
	is_verified: boolean;
	profile_pic_url: string;
	username: string;
}

interface Thumbnailresource {
	src: string;
	config_width: number;
	config_height: number;
}

interface Location {
	id: string;
	has_public_page: boolean;
	name: string;
	slug: string;
}

interface Edgemediatocaption {
	edges: Edge2[];
}

interface Edge2 {
	node: Node2;
}

interface Node2 {
	text: string;
}

interface Owner {
	id: string;
	username: string;
}

interface Sharingfrictioninfo {
	should_have_sharing_friction: boolean;
	bloks_app_url?: any;
}

interface Edgemediatotaggeduser {
	edges: Edge[];
}

interface Edge {
	node: Node;
}

interface Node {
	user: User2;
	x: number;
	y: number;
}

interface User2 {
	full_name: string;
	followed_by_viewer: boolean;
	id: string;
	is_verified: boolean;
	profile_pic_url: string;
	username: string;
}

interface Dimensions {
	height: number;
	width: number;
}

interface Pageinfo2 {
	has_next_page: boolean;
	end_cursor: string;
}

interface Edgefelixvideotimeline {
	count: number;
	page_info: Pageinfo;
	edges: any[];
}

interface Pageinfo {
	has_next_page: boolean;
	end_cursor?: any;
}

interface Edgemutualfollowedby {
	count: number;
	edges: any[];
}

interface Edgefollowedby {
	count: number;
}

interface Biographywithentities {
	raw_text: string;
	entities: Entity[];
}

interface Entity {
	user: User;
	hashtag?: any;
}

interface User {
	username: string;
}
