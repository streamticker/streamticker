import axios from 'axios';
import {Repo, User} from '../../types/github';

export const GitHubAPI = {
	async getRepo(owner: string, repo: string) {
		const {data} = await axios.get<Repo>(`https://api.github.com/repos/${owner}/${repo}`);
		return data;
	},

	async getUser(user: string) {
		const {data} = await axios.get<User>(`https://api.github.com/users/${user}`);
		return data;
	},

	async getUserByID(id: string | number) {
		const {data} = await axios.get<User>(`https://api.github.com/user/${id}`);
		return data;
	},
};
