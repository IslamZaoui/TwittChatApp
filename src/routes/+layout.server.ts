import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { checkConnection } from '$lib/utils';
import { env } from '$env/dynamic/private'

export const config = {
    runtime: 'edge',
};

export const load = (async (event) => {
    let Isviewed: boolean = !((await checkConnection()) && env.PRIVATE_KILLSWITCH == 'false')
    if (Isviewed && event.url.pathname != '/error') {
        throw redirect(303, '/error')
    }

    return { currentUser: event.locals.user, Isviewed: !Isviewed };
}) satisfies LayoutServerLoad