import {LogSnag, PublishOptions} from 'logsnag';

const logsnag = new LogSnag({
	token: '3d935f8885ac94aaf8a955b6659dc2ec',
	project: 'streamticker',
});

async function publish(data: PublishOptions) {
	await logsnag.publish(data).catch(error => {
		console.error(error, data);
	});
}

export {publish as logsnag};
