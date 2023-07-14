<script lang="ts">
	import {
		Avatar,
		Tab,
		TabGroup,
		type ModalSettings,
		modalStore,
		Modal,
		type ModalComponent
	} from '@skeletonlabs/skeleton';
	import type { ActionData, PageData } from './$types';
	import { faEdit, faGear, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import ChangeAvatar from '$lib/Components/ChangeAvatar.svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import { avatarURL } from '$lib/utils';

	export let form: ActionData;
	export let data: PageData;

	$: if (form?.error) {
		toast.error(form?.error);
	}

	$: if (form?.pberror) {
		toast.error(form?.pberror);
	}

	$: if (form?.success) {
		toast.success('Avatar uploaded');
	}

	const user = data.currentUser;

	let tabSet: number = 0;
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
<Toaster/>
<Modal components={modalComponentRegistry} />
<TabGroup
	justify="justify-center"
	active="variant-filled-primary"
	hover="hover:variant-soft-primary"
	flex="flex-1 lg:flex-none"
	rounded=""
	border=""
>
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
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<div class="flex flex-col">
				<div class="container mx-auto px-4 py-8">
					<div class="flex flex-col space-y-5 items-center justify-between mb-4">
						<div class="flex items-center">
							<div class="relative inline-block mr-4">
								<span class="badge-icon variant-filled-warning absolute -top-1 -right-1 z-10">
									<button on:click={changeavatar}><Fa icon={faEdit} /></button>
								</span>
								<Avatar src={avatarURL(user.id,user.avatar)} initials={user.username} width="w-20" />
							</div>
							<h1 class="text-xl font-bold">{user.username}</h1>
						</div>
						<div class="text-sm">
							Account Status: <span class={!user.banned ? 'text-green-500' : 'text-red-500'}
								>{!user.banned ? 'Active' : 'Banned'}</span
							>
						</div>
					</div>
				</div>
			</div>
		{:else if tabSet === 1}
			<div class="container h-full mx-auto flex flex-col justify-center items-center">
				Currently under development
			</div>
		{:else if tabSet === 2}
			<div class="container h-full mx-auto flex flex-col justify-center items-center">
				Currently under development
			</div>
		{/if}
	</svelte:fragment>
</TabGroup>
