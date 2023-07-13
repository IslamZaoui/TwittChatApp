import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { censorBadWords, checkConnection } from '$lib/utils';
import { PRIVATE_KILLSWITCH } from "$env/static/private"
import type { Record } from 'pocketbase';


export const load = (async (event) => {
    let Isviewed: boolean = !((await checkConnection()) && PRIVATE_KILLSWITCH == 'false')
    if (Isviewed && event.url.pathname != '/error') {
        throw redirect(303, '/error')
    }
    
    return { currentUser: event.locals.user, Isviewed: !Isviewed};
}) satisfies LayoutServerLoad;