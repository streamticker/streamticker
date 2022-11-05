import axios from 'axios';
import type {MinecraftServer} from '../../types/minecraft';

export const MinecraftAPI = {
	async getServer(address: string) {
		const {data} = await axios.get<MinecraftServer>(`https://api.mcsrvstat.us/2/${address}`);
		return data;
	},
};
