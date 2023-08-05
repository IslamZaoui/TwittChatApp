import type { RequestHandler } from './$types';


export const GET: RequestHandler = async (event) => {
    const response = await event.fetch('./.well-known/brave-rewards-verification.txt');
    console.log(response)
    return new Response();
};