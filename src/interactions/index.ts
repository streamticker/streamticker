import type {SlashCommand} from 'slash-create';
import {CreateCommand} from './commands/tickers/create';
import {InviteCommand} from './commands/util/invite';
import {PingCommand} from './commands/util/ping';
import {SupportCommand} from './commands/util/support';
import {TickersListCommand} from './commands/util/tickers';
import {VoteCommand} from './commands/util/vote';

export const commands: typeof SlashCommand[] = [
	VoteCommand,
	PingCommand,
	SupportCommand,
	InviteCommand,
	CreateCommand,
	TickersListCommand,
];
