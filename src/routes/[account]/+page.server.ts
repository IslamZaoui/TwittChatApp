import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { ChangeEmSchema, ChangePassSchema, ChangeUnShema, EmailValid, avatarValidation, logschema } from '$lib/validation';
import { fromZodError } from 'zod-validation-error';
import { ClientResponseError } from 'pocketbase';
import { superValidate } from 'sveltekit-superforms/server';
import { FullPostInfo, serializeNonPOJOs } from '../../lib/utils';

export const config = {
    runtime: 'edge',
};

export const load = (async (event) => {
    await event.parent()
    if (!event.locals.pb.authStore.isValid) {
        throw redirect(303, '/')
    }

    const ProfileUser = async () => {
        try {
            return serializeNonPOJOs(await event.locals.pb.collection('users').getList<User>(1, 1, {
                filter: `username="${event.params.account}"`
            }).then((m) => {
                if (m.items.length === 0) throw redirect(303, '/')
                else
                    return m.items[0]
            }))
        }
        catch (_) {
            throw redirect(303, '/')
        }
    }

    let page = (event.url.searchParams.get('page') ?? 1) as number
    let perpage = (event.url.searchParams.get('items') ?? 5) as number
    let totalitems = 0
    const posts = (await event.locals.pb.collection('posts').getList<Post>(page, perpage, {
        expand: 'user',
        sort: '-created',
        filter: `user.username="${event.params.account}"`
    }))
    page = posts.page
    perpage = posts.perPage
    totalitems = posts.totalItems
    let Posts = async () => {
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

    if (event.locals.user.id === event.locals.pb.authStore.model?.id) {
        const FormChangeEmail = async () => { return await superValidate(event, ChangeEmSchema) }
        const FormChangeUsername = async () => { return await superValidate(event, ChangeUnShema) }
        const FormChangePassword = async () => { return await superValidate(event, ChangePassSchema) }
        return {
            FormChangeEmail: FormChangeEmail(), FormChangeUsername: FormChangeUsername(), FormChangePassword: FormChangePassword()
            , ProfileUser: ProfileUser(),Posts:Posts()
        };
    } else {
        return { ProfileUser: ProfileUser(),Posts:Posts() }
    }
}) satisfies PageServerLoad;

export const actions = {
    ChnageAvatar: async (event) => {
        const formData = await event.request.formData();
        const file = formData.get('avatar') as File;
        try {
            avatarValidation.parse(file)
        }
        catch (err) {
            const validationError = fromZodError(err as any);
            return fail(400, { error: validationError.message })
        }
        let avatarForm = new FormData();

        avatarForm.append('avatar', file)

        try {
            await event.locals.pb.collection('users').update(event.locals.user.id, avatarForm)
        } catch (err) {
            if (err instanceof ClientResponseError)
                return fail(400, { pberror: err.message })
        }
        return { success: "avatar changed" }
    },
    ChangeEmail: async (event) => {
        const form = await superValidate(event, ChangeEmSchema)
        if (!form.valid) {
            return fail(400, { form })
        }
        try {
            await event.locals.pb.collection('users').requestEmailChange(form.data.email)
        } catch (error) {
            if (error instanceof ClientResponseError) {
                form.message = error.message
                return fail(error.status, { form })
            }
        }
        form.message = "Email change request sent to your email"
        return { form }
    },
    ChangeUsername: async (event) => {
        const form = await superValidate(event, ChangeUnShema)
        if (!form.valid) {
            return fail(400, { form })
        }
        try {
            await event.locals.pb.collection('users').update(event.locals.user.id, form.data)
        }
        catch (error) {
            if (error instanceof ClientResponseError) {
                form.message = error.message
                return fail(error.status, { form })
            }
        }
        form.message = "Username changed"
        return { form }
    },
    ChangePassword: async (event) => {
        const form = await superValidate(event, ChangePassSchema)
        if (!form.valid) {
            return fail(400, { form })
        }
        try {
            await event.locals.pb.collection('users').update(event.locals.user.id, form.data)
        }
        catch (error) {
            if (error instanceof ClientResponseError) {
                form.message = error.message
                return fail(error.status, { form })
            }
        }
        form.message = "Password Changed"
        return { form }
    },
    ResetPassword: async (event) => {
        const formData = await event.request.formData();
        const email = formData.get('email') as string
        try {
            await EmailValid.parseAsync(email)
        }
        catch (err) {
            const validationError = fromZodError(err as any);
            return fail(400, { error: validationError.message })
        }

        try {
            await event.locals.pb.collection('users').requestPasswordReset(email)
        }
        catch (err) {
            const pberror = err as ClientResponseError
            return fail(400, { error: pberror.message })
        }
        return { success: 'Password Reset Request sent to your email' }
    }
} satisfies Actions