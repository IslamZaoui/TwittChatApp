<script lang="ts">
	import { avatarURL } from '$lib/utils';
	import {
		Avatar,
		modalStore,
		type ModalComponent,
		type ModalSettings,
		Modal
	} from '@skeletonlabs/skeleton';
	import toast, { Toaster } from 'svelte-french-toast';
	import ChangeAvatar from './ChangeAvatar.svelte';
	import type { ActionData, PageData } from '../../routes/[account]/$types';
	import { faEdit } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import PostCard from './PostCard.svelte';

	export let form: ActionData;
	export let data: PageData;

	$: if (form?.error) {
		toast.error(form?.error);
	}

	$: if (form?.pberror) {
		toast.error(form?.pberror);
	}

	$: if (form?.success) {
		toast.success(form?.success);
	}
	data.Posts;
	const modalComponentRegistry: Record<string, ModalComponent> = {
		modalComponentOne: {
			ref: ChangeAvatar
		}
	};
	function changeavatar() {
		const modal: ModalSettings = {
			type: 'component',
			component: 'modalComponentOne'
		};
		modalStore.trigger(modal);
	}
</script>

<Modal components={modalComponentRegistry} />

<div>
	<div class="flex flex-col space-y-5 items-center justify-between mb-4">
		<div class="flex items-center">
			<div class="relative inline-block mr-4">
				{#if data.ProfileUser.username === data.currentUser.username}
					<span class="badge-icon variant-filled-warning absolute -top-1 -right-1 z-10">
						<button on:click={changeavatar}><Fa icon={faEdit} /></button>
					</span>
				{/if}
				<Avatar
					src={avatarURL(data.ProfileUser.id, data.ProfileUser.avatar)}
					initials={data.ProfileUser.username}
					width="w-20"
				/>
			</div>
			<h1 class="text-xl font-bold">{data.ProfileUser.username}</h1>
		</div>
		<div class="text-sm">
			Account Status: <span class={!data.ProfileUser.banned ? 'text-green-500' : 'text-red-500'}
				>{!data.ProfileUser.banned ? 'Active' : 'Banned'}</span
			>,
			<span class={data.ProfileUser.verified ? 'text-green-500' : 'text-red-500'}
				>{data.ProfileUser.verified ? 'Verified' : 'Not Verified'}</span
			>
		</div>
	</div>
	<div class="md:max-h-[60vh] max-h-[63vh] overflow-y-auto">
		<div class="mx-5 h-screen">
			<div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
				{#each data.Posts as post}
					<PostCard {post} />
				{/each}
			</div>
		</div>
	</div>
</div>
