import { message, superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad, Actions } from './$types';
import { EmailValid, logschema } from '$lib/validation';
import { fail, redirect } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import { fromZodError } from 'zod-validation-error';

export const config = {
    runtime: 'edge',
};

export const load = (async (event) => {
    await event.parent()
    if (event.locals.pb.authStore.isValid) {
        throw redirect(303, '/')
    }
    const form = async () => { return await superValidate(event, logschema) }
    return {
        form: form()
    };
}) satisfies PageServerLoad;

export const actions = {
    Login: async (event) => {
        const form = await superValidate(event, logschema)
        if (!form.valid) {
            return fail(400, { form })
        }
        else {
            try {
                await event.locals.pb.collection('users').authWithPassword(form.data.email, form.data.password)
            }
            catch (error) {
                if (error instanceof ClientResponseError) {
                    return message(form, 'Login faild, check your credentials', {
                        status: 401
                    });
                }
            }
            throw redirect(303, '/')
        }
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

        try{
            await event.locals.pb.collection('users').requestPasswordReset(email)
        }
        catch(err){
            const pberror = err as ClientResponseError
            return fail(400, { error: pberror.message })
        }
        return {success:200}
    }
} satisfies Actions