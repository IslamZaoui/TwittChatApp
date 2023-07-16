import type { ClientResponseError } from 'pocketbase';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const config = {
    runtime: 'edge',
};

export const POST: RequestHandler = async (event) => {
    try{
        await event.locals.pb.collection('users').requestVerification(event.locals.user.email)
    }catch(error){
        const pberror = error as ClientResponseError
        return json({type:'error',message:pberror.message})
    }
    return json({type:'success',message:"verification request sent to your email"})
};