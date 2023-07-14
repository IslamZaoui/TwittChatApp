import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { avatarValidation } from '$lib/validation';
import { fromZodError } from 'zod-validation-error';
import { ClientResponseError } from 'pocketbase';

export const config = {
    runtime: 'edge',
};

export const load = (async (event) => {
    await event.parent()
    if (!event.locals.pb.authStore.isValid) {
        throw redirect(303, '/')
    }
    return {}
}) satisfies PageServerLoad;

export const actions = {
    default: async (event) => {
        const formData = await event.request.formData();
        const file = formData.get('avatar') as File;
        let avatar
        try {
            avatar = avatarValidation.parse(file)
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
        return { success: 200 }
    }
} satisfies Actions