import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ListResult } from 'pocketbase';
import { serializeNonPOJOs } from '$lib/utils';
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
    const pagenum = (event.url.searchParams.get('page') ?? 1) as number
    const pageitems = (event.url.searchParams.get('items') ?? 5) as number
    const form = async () => await superValidate(event, PostSchema)
    const posts = async () => {
        try {
            return serializeNonPOJOs((await event.locals.pb.collection('posts').getList<Post>(pagenum, pageitems, {
                expand: 'user',
                sort: '-created'
            })))
        }
        catch (_) {
            return <ListResult<Post>>{}
        }
    }
    return { posts: posts(), form: form() };
}) satisfies PageServerLoad;

export const actions = {
    newpost: async (event) => {
        const FData = await event.request.formData()
        const form = await superValidate(FData, PostSchema);
        const files = FData.getAll('files') as File[]
        if (!form.valid) return fail(400, { form });

        const post = new FormData();

        post.append('subject', form.data.subject)
        post.append('Text', form.data.Text)
        post.append('tags', form.data.tags?.toString() ?? '')
        post.append('user', event.locals.user.id)
        files.forEach((file,i) => {
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