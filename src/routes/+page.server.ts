import type { PageServerLoad } from './$types';

export const config = {
    runtime: 'edge',
};

export const load = (async (event) => {
    await event.parent()
    return { };
}) satisfies PageServerLoad;