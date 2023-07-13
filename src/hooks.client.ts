import { pb } from '$lib/pb'

pb.authStore.loadFromCookie(document.cookie)
const isProd = process.env.NODE_ENV === 'production';
pb.authStore.onChange(() => {
    document.cookie = pb.authStore.exportToCookie({ secure: isProd, sameSite: 'Lax' })
})