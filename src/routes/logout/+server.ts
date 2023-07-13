import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const config = {
    runtime: 'edge',
  };

export const POST: RequestHandler = async (event) => {
    event.locals.pb?.authStore.clear()
    event.locals.user = undefined
    throw redirect(303,'/login')
};