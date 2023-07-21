import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ListResult } from 'pocketbase';
import { serializeNonPOJOs } from '$lib/utils';
export const config = {
    runtime: 'edge',
};

export const load = (async (event) => {
    await event.parent()
    if (!event.locals.pb.authStore.isValid) {
        throw redirect(303, '/')
    }
    const pagenum = (event.url.searchParams.get('page') ?? 1 )as number
    const pageitems = (event.url.searchParams.get('items') ?? 5 )as number
    const posts = async () => {
        try {
            return serializeNonPOJOs((await event.locals.pb.collection('posts').getList<Post>(pagenum, pageitems, {
                expand: 'user',
                sort: 'created'
            })))
        }
        catch (_) {
            return <ListResult<Post>>{}
        }
    }
    return { posts: posts() };
}) satisfies PageServerLoad;