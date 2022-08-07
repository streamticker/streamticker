export interface InstagramUser {
	graphql: GraphQL;
	status: string;
}

export interface GraphQL {
	user: User;
}

export interface User {
	biography: string;
	bio_links: any[];
	biography_with_entities: BiographyWithEntities;
	blocked_by_viewer: boolean;
	restricted_by_viewer: any;
	country_block: boolean;
	external_url: string;
	external_url_linkshimmed: string;
	edge_followed_by: EdgeFollowedBy;
	fbid: string;
	followed_by_viewer: boolean;
	edge_follow: EdgeFollow;
	follows_viewer: boolean;
	full_name: string;
	group_metadata: any;
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
	guardian_id: any;
	business_address_json: any;
	business_contact_method: string;
	business_email: any;
	business_phone_number: any;
	business_category_name: any;
	overall_category_name: any;
	category_enum: any;
	category_name: string;
	is_private: boolean;
	is_verified: boolean;
	edge_mutual_followed_by: EdgeMutualFollowedBy;
	profile_pic_url: string;
	profile_pic_url_hd: string;
	requested_by_viewer: boolean;
	should_show_category: boolean;
	should_show_public_contacts: boolean;
	state_controlled_media_country: any;
	location_transparency_country: any;
	transparency_label: any;
	transparency_product: string;
	username: string;
	connected_fb_page: any;
	pronouns: any[];
	edge_felix_video_timeline: EdgeFelixVideoTimeline;
	edge_owner_to_timeline_media: EdgeOwnerToTimelineMedia;
	edge_saved_media: EdgeSavedMedia;
	edge_media_collections: EdgeMediaCollections;
	edge_related_profiles: EdgeRelatedProfiles;
}

export interface BiographyWithEntities {
	raw_text: string;
	entities: Entity[];
}

export interface Entity {
	user: User2;
	hashtag: any;
}

export interface User2 {
	username: string;
}

export interface EdgeFollowedBy {
	count: number;
}

export interface EdgeFollow {
	count: number;
}

export interface EdgeMutualFollowedBy {
	count: number;
	edges: any[];
}

export interface EdgeFelixVideoTimeline {
	count: number;
	page_info: PageInfo;
	edges: any[];
}

export interface PageInfo {
	has_next_page: boolean;
	end_cursor: any;
}

export interface EdgeOwnerToTimelineMedia {
	count: number;
	page_info: PageInfo2;
	edges: Edge[];
}

export interface PageInfo2 {
	has_next_page: boolean;
	end_cursor: string;
}

export interface Edge {
	node: Node;
}

export interface Node {
	__typename: string;
	id: string;
	shortcode: string;
	dimensions: Dimensions;
	display_url: string;
	edge_media_to_tagged_user: EdgeMediaToTaggedUser;
	fact_check_overall_rating: any;
	fact_check_information: any;
	gating_info: any;
	sharing_friction_info: SharingFrictionInfo;
	media_overlay_info: any;
	media_preview: any;
	owner: Owner;
	is_video: boolean;
	has_upcoming_event: boolean;
	accessibility_caption: any;
	edge_media_to_caption: EdgeMediaToCaption;
	edge_media_to_comment: EdgeMediaToComment;
	comments_disabled: boolean;
	taken_at_timestamp: number;
	edge_liked_by: EdgeLikedBy;
	edge_media_preview_like: EdgeMediaPreviewLike;
	location?: Location;
	nft_asset_info: any;
	thumbnail_src: string;
	thumbnail_resources: ThumbnailResource[];
	coauthor_producers: CoauthorProducer[];
	pinned_for_users: PinnedForUser[];
	edge_sidecar_to_children: EdgeSidecarToChildren;
}

export interface Dimensions {
	height: number;
	width: number;
}

export interface EdgeMediaToTaggedUser {
	edges: Edge2[];
}

export interface Edge2 {
	node: Node2;
}

export interface Node2 {
	user: User3;
	x: number;
	y: number;
}

export interface User3 {
	full_name: string;
	followed_by_viewer: boolean;
	id: string;
	is_verified: boolean;
	profile_pic_url: string;
	username: string;
}

export interface SharingFrictionInfo {
	should_have_sharing_friction: boolean;
	bloks_app_url: any;
}

export interface Owner {
	id: string;
	username: string;
}

export interface EdgeMediaToCaption {
	edges: Edge3[];
}

export interface Edge3 {
	node: Node3;
}

export interface Node3 {
	text: string;
}

export interface EdgeMediaToComment {
	count: number;
}

export interface EdgeLikedBy {
	count: number;
}

export interface EdgeMediaPreviewLike {
	count: number;
}

export interface Location {
	id: string;
	has_public_page: boolean;
	name: string;
	slug: string;
}

export interface ThumbnailResource {
	src: string;
	config_width: number;
	config_height: number;
}

export interface CoauthorProducer {
	id: string;
	is_verified: boolean;
	profile_pic_url: string;
	username: string;
}

export interface PinnedForUser {
	id: string;
	is_verified: boolean;
	profile_pic_url: string;
	username: string;
}

export interface EdgeSidecarToChildren {
	edges: Edge4[];
}

export interface Edge4 {
	node: Node4;
}

export interface Node4 {
	__typename: string;
	id: string;
	shortcode: string;
	dimensions: Dimensions2;
	display_url: string;
	edge_media_to_tagged_user: EdgeMediaToTaggedUser2;
	fact_check_overall_rating: any;
	fact_check_information: any;
	gating_info: any;
	sharing_friction_info: SharingFrictionInfo2;
	media_overlay_info: any;
	media_preview: string;
	owner: Owner2;
	is_video: boolean;
	has_upcoming_event: boolean;
	accessibility_caption: any;
	dash_info?: DashInfo;
	has_audio?: boolean;
	tracking_token?: string;
	video_url?: string;
	video_view_count?: number;
}

export interface Dimensions2 {
	height: number;
	width: number;
}

export interface EdgeMediaToTaggedUser2 {
	edges: Edge5[];
}

export interface Edge5 {
	node: Node5;
}

export interface Node5 {
	user: User4;
	x: number;
	y: number;
}

export interface User4 {
	full_name: string;
	followed_by_viewer: boolean;
	id: string;
	is_verified: boolean;
	profile_pic_url: string;
	username: string;
}

export interface SharingFrictionInfo2 {
	should_have_sharing_friction: boolean;
	bloks_app_url: any;
}

export interface Owner2 {
	id: string;
	username: string;
}

export interface DashInfo {
	is_dash_eligible: boolean;
	video_dash_manifest: any;
	number_of_qualities: number;
}

export interface EdgeSavedMedia {
	count: number;
	page_info: PageInfo3;
	edges: any[];
}

export interface PageInfo3 {
	has_next_page: boolean;
	end_cursor: any;
}

export interface EdgeMediaCollections {
	count: number;
	page_info: PageInfo4;
	edges: any[];
}

export interface PageInfo4 {
	has_next_page: boolean;
	end_cursor: any;
}

export interface EdgeRelatedProfiles {
	edges: any[];
}
