import { pb } from '$lib/pb';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')

	if (pb.authStore.isValid) {
		try {
			await pb.collection('users').authRefresh()
		} catch (_) {
			pb.authStore.clear()
		}
	}

	event.locals.pb = pb
	event.locals.user = structuredClone(pb.authStore.model)

	const response = await resolve(event);

	const isProd = process.env.NODE_ENV === 'production';
	response.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ secure: isProd, sameSite: 'Lax' })
	);

	return response;
};