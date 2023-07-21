import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ListResult } from 'pocketbase';
export const config = {
    runtime: 'edge',
};

export const load = (async (event) => {
    await event.parent()
    if (!event.locals.pb.authStore.isValid) {
        throw redirect(303, '/')
    }
    const posts = async () => {
        try {
            return (await event.locals.pb.collection('posts').getList(1, 50, {
                expand: 'user',
                sort: 'created'
            })).items.map((msg) => msg.export() as Post)
        }
        catch (_) {
            return <Post[]>{}
        }
    }
    return { posts: posts() };
}) satisfies PageServerLoad;