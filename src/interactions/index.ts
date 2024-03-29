import type {SlashCommand} from 'slash-create';
import {CreateCommand} from './commands/tickers/create';
import {FormatCommand} from './commands/tickers/format';
import {ListCommand} from './commands/tickers/list';
import {RefreshCommand} from './commands/tickers/refresh';
import {RemoveCommand} from './commands/tickers/remove';
import {SetupCommand} from './commands/tickers/setup';
import {BugReportCommand} from './commands/util/bugreport';
import {FeatureCommand} from './commands/util/feature';
import {FeedbackCommand} from './commands/util/feedback';
import {InviteCommand} from './commands/util/invite';
import {PingCommand} from './commands/util/ping';
import {StatsCommand} from './commands/util/stats';
import {SupportCommand} from './commands/util/support';
import {TickersListCommand} from './commands/util/tickers';
import {VoteCommand} from './commands/util/vote';

export const commands: Array<typeof SlashCommand> = [
	VoteCommand,
	PingCommand,
	SupportCommand,
	InviteCommand,
	CreateCommand,
	TickersListCommand,
	FeedbackCommand,
	FormatCommand,
	RefreshCommand,
	RemoveCommand,
	SetupCommand,
	ListCommand,
	StatsCommand,
	BugReportCommand,
	FeatureCommand,
];
