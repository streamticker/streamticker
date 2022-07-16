import {Ticker, TickerType} from '@prisma/client';
import {Client} from 'discord.js';
import {HarvesterConfig, TickerRequirement} from '../../harvester';
import {DiscordAPI} from './api';

export class DiscordBoosts extends DiscordAPI {
	public config: HarvesterConfig = {
		requirement: TickerRequirement.NONE,
		strategy: {
			identifier: ticker => ticker.guild_id,
		},
	};

	constructor(client: Client<true>) {
		super(client, TickerType.DISCORD_BOOSTS);
	}

	protected async harvest(ticker: Ticker) {
		const guild = await this.client.guilds.fetch({
			guild: ticker.guild_id,
		});

		return this.getBoosts(guild);
	}
}
