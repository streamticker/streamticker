import {REST} from '@discordjs/rest';
import {env} from '../../../server/env';

export const discord = new REST({version: '10'}).setToken(env.DISCORD_BOT_TOKEN);
export {Routes} from 'discord-api-types/v10';
