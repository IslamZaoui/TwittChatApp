import type { PageServerLoad } from './$types';
import { VERCEL_COMMIT_REF } from '$env/static/private';

export const config = {
    runtime: 'edge',
};

export const load = (async (event) => {
    await event.parent()
    return { git: VERCEL_COMMIT_REF };
}) satisfies PageServerLoad;