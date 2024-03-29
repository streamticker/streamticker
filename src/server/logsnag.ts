import type {PublishOptions} from 'logsnag';
import {LogSnag} from 'logsnag';
import type {InsightOptions} from 'logsnag/dist/types/insight';

const logsnag = new LogSnag({
	token: '3d935f8885ac94aaf8a955b6659dc2ec',
	project: 'streamticker',
});

async function publish(data: PublishOptions) {
	await logsnag.publish(data).catch(error => {
		console.error(error, data);
	});
}

async function insight(options: InsightOptions) {
	await logsnag.insight(options);
}

export {publish as logsnag, insight};
