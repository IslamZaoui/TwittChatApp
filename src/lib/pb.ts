import pocketbase from 'pocketbase'
import {PUBLIC_POCKETBASE_URL} from '$env/static/public'

export const pb = new pocketbase(PUBLIC_POCKETBASE_URL)