import { pb } from '$lib/pb';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		if (pb.authStore.isValid) {
			await pb.collection('users').authRefresh();

			event.locals.user = structuredClone(pb.authStore.model);
		}
	} catch (err) {
		pb.authStore.clear();
	}
	event.locals.pb = pb
	const response = await resolve(event);

	const isProd = process.env.NODE_ENV === 'production' ? true : false;
	response.headers.set(
		'set-cookie',
		pb.authStore.exportToCookie({ secure: isProd, sameSite: 'Lax' })
	);

	return response;
};