import {APIResponse, NextkitError} from 'nextkit';

export async function fetcher<T>(url: string) {
	const request = await fetch(url);
	const body = (await request.json()) as APIResponse<T>;

	if (!body.success) {
		throw new NextkitError(request.status, body.message);
	}

	return body.data;
}
