import { checkConnection } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {PRIVATE_KILLSWITCH} from "$env/static/private"

export const config = {
    runtime: 'edge',
  };

export const load = (async (event) => {
    await event.parent()
    if (await checkConnection() && PRIVATE_KILLSWITCH == 'false') {
        throw redirect(301, '/')
    }
    return {};
}) satisfies PageServerLoad;