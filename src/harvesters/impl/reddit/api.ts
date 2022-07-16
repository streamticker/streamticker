import axios from 'axios';
import {Subreddit} from '../../types/reddit';

export const RedditAPI = {
	async getSubreddit(subreddit: string) {
		const {data} = await axios.get<{data: {children: Array<{data: Subreddit}>}}>(
			`https://www.reddit.com/r/${subreddit}/.json?limit=1`
		);

		return data.data.children[0].data;
	},
};
