import type api from '../../../pages/api/hello';
import {createAPIHook} from '../create';

export const useActiveUser = createAPIHook<typeof api>('/api/@me');
