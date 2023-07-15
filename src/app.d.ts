declare module '@fortawesome/pro-solid-svg-icons/index.es' {
	export * from '@fortawesome/pro-solid-svg-icons';
}

import type { User } from '$lib/types';
import PocketBase, { Admin, Record } from 'pocketbase';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	declare namespace App {
		interface Locals {
			pb: PocketBase;
			user: User | undefined;
		}
		interface PageData {
			flash?: { type: 'success' | 'error'; message: string };
		  }
		// interface Error {}
		// interface Platform {}
	}
	declare module 'simple-svelte-autocomplete';
}
/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />
