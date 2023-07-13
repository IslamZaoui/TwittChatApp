import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { msgschema } from '$lib/validation';
import { ClientResponseError } from 'pocketbase';
import { censorBadWords, hasBadWord } from '$lib/utils';
import { pb } from '$lib/pb';

export const config = {
    runtime: 'edge',
};

export const load = (async (event) => {
    await event.parent()
    if (!event.locals.pb?.authStore.isValid) {
        throw redirect(303, '/')
    }
    let messages: any[] = []
    let banned: boolean = false
    try {
        const list = await pb.collection('messages').getList(1, 50, {
            sort: 'created',
            expand: 'user'

        })
        messages = list.items
    }
    catch (error) {
        messages = []
    }
    banned = (await pb.collection('users').getOne(event.locals.user.id)).banned
    const form = await superValidate(event, msgschema)
    return { form, messages: messages.map((msg) => msg.export()), banned }
}) satisfies PageServerLoad;

export const actions = {
    default: async (event) => {
        const form = await superValidate(event, msgschema)
        if (!form.valid) {
            return fail(400, { form })
        }
        else {
            if (await hasBadWord(form.data.text)) {
                const user = await pb.collection('users').getOne(event.locals.user.id)
                try {

                    await pb.collection('users').update(event.locals.user.id, { swear: (user.swear as number) + 1 })

                }
                catch (_) {
                    await pb.collection('users').update(event.locals.user.id, { banned: true })
                }
                form.data.text = await censorBadWords(form.data.text)
            }
            try {
                const NewMsg: messages = { text: form.data.text, user: event.locals.user.id, like: 0, dislike: 0 }
                await pb.collection('messages').create(NewMsg)
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