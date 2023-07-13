import { checkConnection } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private'

export const config = {
    runtime: 'edge',
  };

export const load = (async (event) => {
    await event.parent()
    if (await checkConnection() && env.PRIVATE_KILLSWITCH == 'false') {
        throw redirect(301, '/')
    }
    return {};
}) satisfies PageServerLoad;