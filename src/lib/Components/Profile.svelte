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
	import type { ActionData } from '../../routes/account/$types';
	import { faEdit } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { PageData } from '../../routes/account/$types';

	export let form: ActionData;
	export let data: PageData

	$: if (form?.error) {
		toast.error(form?.error);
	}

	$: if (form?.pberror) {
		toast.error(form?.pberror);
	}

	$: if (form?.success) {
		toast.success(form?.success);
	}

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
<div class="flex flex-col">
	<div class="container mx-auto px-4 py-8">
		<div class="flex flex-col space-y-5 items-center justify-between mb-4">
			<div class="flex items-center">
				<div class="relative inline-block mr-4">
					<span class="badge-icon variant-filled-warning absolute -top-1 -right-1 z-10">
						<button on:click={changeavatar}><Fa icon={faEdit} /></button>
					</span>
					<Avatar src={avatarURL(data.currentUser.id, data.currentUser.avatar)} initials={data.currentUser.username} width="w-20" />
				</div>
				<h1 class="text-xl font-bold">{data.currentUser.username}</h1>
			</div>
			<div class="text-sm">
				Account Status: <span class={!data.currentUser.banned ? 'text-green-500' : 'text-red-500'}
					>{!data.currentUser.banned ? 'Active' : 'Banned'}</span
				>
			</div>
		</div>
	</div>
</div>
