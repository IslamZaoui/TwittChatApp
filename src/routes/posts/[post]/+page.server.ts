import { redirect, type Actions, error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { serializeNonPOJOs } from '$lib/utils';
export const config = {
    runtime: 'edge',
};
export const load = (async (event) => {
    await event.parent()
    if (!event.locals.pb.authStore.isValid) {
        throw redirect(303, '/')
    }
    const post = async () => {
        try {
            return serializeNonPOJOs((await event.locals.pb.collection('posts').getOne<Post>(event.params.post, {
                expand: 'user'
            })))
        }
        catch (_) {
            console.log('get post info error')
            throw redirect(303, '/posts')
        }
    }
    const postlikes = async () => {
        try {

            return (await event.locals.pb.collection('posts_likes').getFullList({
                expand: 'post',
                filter: `post.id="${event.params.post}" && status=true`
            })).length
        }
        catch (error) {
            console.log(error)
            throw redirect(303, '/posts')
        }
    }
    let youlike
    try {
        let you = (await event.locals.pb.collection('posts_likes').getList(1, 1, {
            filter: `user.id="${event.locals.user.id}" && post.id="${event.params.post}"`
        }))
        if (you.totalItems !== 1) {
            you = await event.locals.pb.collection('posts_likes').create({
                post: event.params.post,
                user: event.locals.user.id,
                status: false
            })
        }

        youlike = you.items.map((m) => m.export() as PostLike).at(0)
    }
    catch (_) {
        youlike = <PostLike>{}
    }
    let postviews
    try {

        postviews = (await event.locals.pb.collection('posts_likes').getFullList({
            expand: 'post',
            filter: `post.id="${event.params.post}"`
        })).length
    }
    catch (error) {
        console.log(error)
        throw redirect(303, '/posts')
    }


    return {
        post: post(),
        postlikes: postlikes(),
        youlike,
        postviews
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    like: async (event) => {
        const form = await event.request.formData()
        const like = form.get('like') as 'like' | 'nolike'
        const id = form.get('id') as string
        console.log('like: ' + like + ', id: ' + id)
        try {
            if (like) {
                if (id) {
                    await event.locals.pb.collection('posts_likes').update(id, {
                        status: (like === 'like') ? true : false
                    })
                } else {

                }
            }
        }
        catch (error) {
            console.log(error)
        }
    },
    delete: async (event) => {
        const id = (await event.request.formData()).get('id') as string
        try { await event.locals.pb.collection('posts').delete(id) }
        catch (err) { return fail(400) }
        throw redirect(303, '/posts')
    }
};