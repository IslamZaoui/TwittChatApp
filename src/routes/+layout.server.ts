import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import {  checkConnection } from '$lib/utils';
import { PRIVATE_KILLSWITCH } from "$env/static/private"

export const config = {
    runtime: 'edge',
  };

export const load = (async (event) => {
    let Isviewed: boolean = !((await checkConnection()) && PRIVATE_KILLSWITCH == 'false')
    if (Isviewed && event.url.pathname != '/error') {
        throw redirect(303, '/error')
    }
    
    return { currentUser: event.locals.user, Isviewed: !Isviewed};
}) satisfies LayoutServerLoad;