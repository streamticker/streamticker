import {TickerType} from '@prisma/client';
import {api} from '../../server/api';
import {getStats} from '../../server/stats';

export default api({
	async GET({ctx}) {
		return getStats();
	},
});
