<script lang="ts">
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import type { ActionData, PageData } from './$types';
	import { faGear, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Profile from '$lib/Components/Profile.svelte';
	import Settings from '$lib/Components/Settings.svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import { page } from '$app/stores';

	export let form: ActionData;
	export let data: PageData;
	let user = data.currentUser.username === $page.params.account;

	let tabSet: number = 0;
</script>

<Toaster />
<svelte:head>
	<title>Account</title>
</svelte:head>
<TabGroup
	justify="justify-center"
	active="variant-filled-primary"
	hover="hover:variant-soft-primary"
	flex="flex-1 lg:flex-none"
	rounded=""
	border=""
>
	{#if user}
		<Tab bind:group={tabSet} name="tab1" value={0}>
			<svelte:fragment slot="lead"
				><span class="flex justify-center"><Fa icon={faUser} /></span></svelte:fragment
			>
			<span>Profile</span>
		</Tab>
		<Tab bind:group={tabSet} name="tab1" value={1}>
			<svelte:fragment slot="lead"
				><span class="flex justify-center"><Fa icon={faGear} /></span></svelte:fragment
			>
			<span>Settings</span>
		</Tab>
		<Tab bind:group={tabSet} name="tab1" value={2}>
			<svelte:fragment slot="lead"
				><span class="flex justify-center"><Fa icon={faLock} /></span></svelte:fragment
			>
			<span>Security</span>
		</Tab>
	{/if}

	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<Profile {data} {form} />
		{:else if tabSet === 1 && user}
			<Settings {data} {form} />
		{:else if tabSet === 2 && user}
			<div class="container h-full mx-auto flex flex-col justify-center items-center">
				Currently under development
			</div>
		{/if}
	</svelte:fragment>
</TabGroup>
