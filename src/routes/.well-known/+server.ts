import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
    const response = await event.fetch('brave-rewards-verification.txt');
    return new Response(await response.text());
};