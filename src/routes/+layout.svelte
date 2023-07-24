<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import { AppShell } from '@skeletonlabs/skeleton';
	import NavBar from '$lib/Components/NavBar.svelte';
	import type { LayoutData } from './$types';
	//import { dev } from '$app/environment';
	//import { inject } from '@vercel/analytics';
	import SideBar from '$lib/Components/SideBar.svelte';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	//inject({ mode: dev ? 'development' : 'production' });
	export let data: LayoutData;
</script>

<AppShell>
	<svelte:fragment slot="header">
		<NavBar currentuser={data.currentUser} Isviewed={data.Isviewed} />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<SideBar {data} />
	</svelte:fragment>
	<slot />
</AppShell>
