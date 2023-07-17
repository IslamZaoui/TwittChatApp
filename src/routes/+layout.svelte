<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { AppShell } from '@skeletonlabs/skeleton';
	import NavBar from '$lib/Components/NavBar.svelte';
	import type { LayoutData } from './$types';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import SideBar from '$lib/Components/SideBar.svelte';
	inject({ mode: dev ? 'development' : 'production' });
	export let data: LayoutData;
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<NavBar currentuser={data.currentUser} Isviewed={data.Isviewed} />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<SideBar data={data}/>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
