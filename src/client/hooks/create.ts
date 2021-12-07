import useSWR from 'swr';
import {NextkitException, InferAPIResponse} from 'nextkit';

export function createAPIHook<T, E = NextkitException>(url: `/api/${string}`) {
	return () => useSWR<InferAPIResponse<T, 'GET'>, E>(url);
}
