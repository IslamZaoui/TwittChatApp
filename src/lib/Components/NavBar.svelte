<script lang="ts">
	import { AppBar, Avatar } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import { faSignOut } from '@fortawesome/free-solid-svg-icons';
	import logo from '../favicon.png';
	import { avatarURL } from '$lib/utils';
	export let currentuser: User | undefined;
	export let Isviewed: boolean;
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<a href="/" class="flex space-x-1 items-center">
			<img src={logo} class="aspect-square w-8" alt="logo" />
			<strong class="text-xl uppercase">Twitt</strong>
		</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		{#if Isviewed}
			{#if currentuser}
			<a class="btn btn-sm variant-ghost-surface" href="/account"> Account </a>
				<div class="relative inline-block">
					<span class="badge-icon variant-filled-warning absolute -top-1 -right-1 z-10"
						><form action="/logout" method="POST">
							<button><Fa icon={faSignOut} /></button>
						</form></span
					>
					<Avatar src={avatarURL(currentuser.id,currentuser.avatar)} initials={currentuser.username} width="w-10" />
				</div>
			{:else}
				<a class="btn btn-sm variant-ghost-surface" href="/login"> Login </a>
				<a class="btn btn-sm variant-ghost-surface" href="/register"> Register </a>
			{/if}
		{/if}
	</svelte:fragment>
</AppBar>
