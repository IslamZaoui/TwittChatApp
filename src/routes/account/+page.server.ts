import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { ChangeEmSchema, ChangePassSchema, ChangeUnShema, avatarValidation, logschema } from '$lib/validation';
import { fromZodError } from 'zod-validation-error';
import { ClientResponseError } from 'pocketbase';
import { superValidate } from 'sveltekit-superforms/server';

export const config = {
    runtime: 'edge',
};

export const load = (async (event) => {
    await event.parent()
    if (!event.locals.pb.authStore.isValid) {
        throw redirect(303, '/')
    }
    const FormChangeEmail = await superValidate(event, ChangeEmSchema)
    const FormChangeUsername = await superValidate(event, ChangeUnShema)
    const FormChangePassword = await superValidate(event, ChangePassSchema)
    return {
        FormChangeEmail, FormChangeUsername, FormChangePassword
    };
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
} satisfies Actions