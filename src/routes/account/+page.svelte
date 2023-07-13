<script lang="ts">
	import {
		Avatar,
		Tab,
		TabGroup,
		Table,
		tableMapperValues,
		type TableSource
	} from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { faEdit, faGear, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	export let data: PageData;
	const user = data.currentUser;
	let tabSet: number = 0;

	const sourceData = [
		{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
		{ position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
		{ position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
        { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
        { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
	];

	const tableSimple: TableSource = {
		head: ['Name', 'Symbol', 'Weight'],
		body: tableMapperValues(sourceData, ['name', 'symbol', 'weight']),
	};
</script>

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
								<span class="badge-icon variant-filled-warning absolute -top-1 -right-1 z-10"
									><form>
										<button><Fa icon={faEdit} /></button>
									</form></span
								>
								<Avatar src={user.avatar} initials={user.username} width="w-20" />
							</div>
							<h1 class="text-xl font-bold">{user.username}</h1>
						</div>
						<div class="text-sm">Account Status: <span class="{(!user.banned ? 'text-green-500' : 'text-red-500')}">{(!user.banned ? 'Active' : 'Banned')}</span></div>
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
