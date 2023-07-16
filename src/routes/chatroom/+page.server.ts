import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { msgschema } from '$lib/validation';
import { ClientResponseError } from 'pocketbase';

export const config = {
    runtime: 'edge',
};

export const load = (async (event) => {
    await event.parent()
    if (!event.locals.pb.authStore.isValid) {
        throw redirect(303, '/')
    }

    const messages = async () => {
        if (event.locals.user.verified) {
            try {
                return (await event.locals.pb.collection('messages').getList(1, 50, {
                    sort: 'created',
                    expand: 'user'

                })).items.map((msg) => msg.export())
            } catch (_) {
                return []
            }
        } else {
            return []
        }
    }
    const banned = async () => { return (await event.locals.pb.collection('users').getOne(event.locals.user.id)).banned as boolean }
    const form = async () => { return await superValidate(event, msgschema) }
    return { form: form(), messages: messages(), banned: banned() }
}) satisfies PageServerLoad;

export const actions = {
    default: async (event) => {
        const form = await superValidate(event, msgschema)
        if (!form.valid) {
            return fail(400, { form })
        }
        else {
            try {
                const NewMsg: messages = { text: form.data.text, user: event.locals.user.id, like: 0, dislike: 0 }
                await event.locals.pb.collection('messages').create(NewMsg)
            }
            catch (error) {
                if (error instanceof ClientResponseError) {
                    form.data.text = ''
                    return message(form, 'Somthing went wrong', {
                        status: 401
                    });
                }
            }
            form.data.text = ""
            return { form }
        }
    }
} satisfies Actions