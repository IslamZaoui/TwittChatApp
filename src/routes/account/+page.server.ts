import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const config = {
    runtime: 'edge',
  };

export const load = (async (event) => {
    await event.parent()
    if (!event.locals.pb?.authStore.isValid) {
        throw redirect(303, '/')
    }
    return {};
}) satisfies PageServerLoad;