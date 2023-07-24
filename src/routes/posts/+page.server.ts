import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ListResult } from 'pocketbase';
import { serializeNonPOJOs, FullPostInfo } from '$lib/utils';
import { superForm, superValidate } from 'sveltekit-superforms/client';
import { PostSchema } from '$lib/validation';
export const config = {
    runtime: 'edge',
};

export const load = (async (event) => {
    await event.parent()
    if (!event.locals.pb.authStore.isValid) {
        throw redirect(303, '/')
    }
    let page = (event.url.searchParams.get('page') ?? 1) as number
    let perpage = (event.url.searchParams.get('items') ?? 5) as number
    let totalitems = 0
    const form = async () => await superValidate(event, PostSchema)
    const posts = (await event.locals.pb.collection('posts').getList<Post>(page, perpage, {
        expand: 'user',
        sort: '-created'
    }))
    page = posts.page
    perpage = posts.perPage
    totalitems = posts.totalItems
    let postss = async () => {
        try {

            const posts_id = posts.items.map(post => post.id)
            const postslikes = await event.locals.pb.collection('posts_likes').getFullList<PostLike>({
                filter: posts_id.map((sku) => `post.id="${sku}"`).join("||")
            })
            const FullPosts = serializeNonPOJOs(FullPostInfo(posts.items, postslikes))

            return FullPosts
        }
        catch (_) {
            return <PostFull[]>{}
        }
    }

    return { posts: postss(), form: form(), page, perpage, totalitems };
}) satisfies PageServerLoad;

export const actions = {
    newpost: async (event) => {
        const FData = await event.request.formData()
        const form = await superValidate(FData, PostSchema);
        const files = FData.getAll('files') as File[]
        console.log(form.errors)
        if (!form.valid) return fail(400, { form });

        const post = new FormData();

        post.append('subject', form.data.subject)
        post.append('Text', form.data.Text)
        post.append('tags', form.data.tags?.toString() ?? '')
        post.append('user', event.locals.user.id)
        files.forEach((file, i) => {
            if (file.name !== 'undefined')
                post.append('files', file)
        })

        try {
            await event.locals.pb.collection('posts').create(post)
        }
        catch (err) {
            return fail(400, { form });
        }
        return
    }
} satisfies Actions;