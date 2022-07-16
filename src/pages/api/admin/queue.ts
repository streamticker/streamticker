import {api} from '../../../server/api';
import {enqueue} from '../../../server/scheduler';

export default api({
	async GET({req}) {
		const url = `https://${req.headers.host}/api/lowcake`;
		return enqueue(url);
	},
});
