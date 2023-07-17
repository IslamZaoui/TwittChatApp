<script lang="ts">
	import { AppBar, Avatar, Drawer, LightSwitch, drawerStore } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import { faBars, faSignOut } from '@fortawesome/free-solid-svg-icons';
	import logo from '../favicon.png';
	import { avatarURL } from '$lib/utils';
	import SideBarDrawer from './SideBarDrawer.svelte';
	export let currentuser: User | undefined;
	export let Isviewed: boolean;
</script>

<Drawer width="w-[200px]">
	<SideBarDrawer {currentuser} />
</Drawer>
<AppBar>
	<svelte:fragment slot="lead">
		<button class="btn-icon ml-2 md:hidden" on:click={() => drawerStore.open()}
			><Fa icon={faBars} /></button
		>
		<a href="/" class="flex space-x-1 items-center">
			<img src={logo} class="aspect-square w-8" alt="logo" />
			<strong class="text-xl uppercase">Twitt</strong>
		</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		{#if Isviewed}
			{#if currentuser}
				<LightSwitch />
				<a
					class="btn btn-sm variant-filled-primary hover:variant-soft-primary hidden md:block"
					href="/account"
				>
					Account
				</a>
				<div class="relative inline-block">
					<span class="badge-icon variant-filled-warning absolute -top-1 -right-1 z-10"
						><form action="/logout" method="POST">
							<button class="flex"><Fa icon={faSignOut} /></button>
						</form></span
					>
					<Avatar
						src={avatarURL(currentuser.id, currentuser.avatar)}
						initials={currentuser.username}
						width="w-10"
					/>
				</div>
			{:else}
				<a class="btn btn-sm variant-filled-secondary hover:variant-soft-secondary" href="/login">
					Login
				</a>
				<a
					class="btn btn-sm variant-filled-secondary hover:variant-soft-secondary"
					href="/register"
				>
					Register
				</a>
			{/if}
		{/if}
	</svelte:fragment>
</AppBar>
