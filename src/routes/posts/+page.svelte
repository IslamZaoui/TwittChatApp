<script lang="ts">
	import PostCard from '$lib/Components/PostCard.svelte';
	import {
		AppShell,
		InputChip,
		Modal,
		Paginator,
		type ModalComponent,
		type ModalSettings,
		modalStore,
		type PopupSettings,
		popup
	} from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { searchPosts } from '$lib/utils';
	import NewPostModal from '$lib/Components/NewPostModal.svelte';
	export let data: PageData;
	let Searchlist: string[] = [];

	let pagenum = ($page.url.searchParams.get('page') ?? data.posts.page) as number;
	let pageitems = ($page.url.searchParams.get('items') ?? data.posts.perPage) as number;

	let posts: Post[] = [];

	$: if (Searchlist.length != 0) {
		posts = searchPosts(data.posts.items, Searchlist);
	} else {
		posts = data.posts.items;
	}

	let pagesettings = {
		offset: 0,
		limit: data.posts.perPage,
		size: data.posts.totalItems,
		amounts: [5, 10, 20, 50]
	};

	function onPageChange(e: CustomEvent): void {
		pagenum = e.detail + 1;
		goto('/posts?page=' + pagenum + '&items=' + pageitems);
	}

	function onAmountChange(e: CustomEvent): void {
		pageitems = e.detail;
		goto('/posts?page=' + pagenum + '&items=' + pageitems);
	}

	const modalComponent: ModalComponent = {
		ref: NewPostModal
	};

	function NewPost() {
		const modal: ModalSettings = {
			type: 'component',
			component: modalComponent
		};
		modalStore.trigger(modal);
	}

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement: 'bottom'
	};
</script>

<Modal />
<svelte:head>
	<title>Posts</title>
</svelte:head>
<AppShell>
	<svelte:fragment slot="pageHeader">
		<nav
			class="card p-2 m-2 rounded-none flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-5"
		>
			<div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-5">
				<InputChip
					rounded="rounded"
					class="w-full"
					bind:value={Searchlist}
					name="chips"
					placeholder="Search..."
				/>
				{#if data.currentUser.banned || !data.currentUser.verified}
					<button class="btn variant-filled-primary w-full sm:w-auto [&>*]:pointer-events-none">
						New Post
					</button>
				{:else}
					<button class="btn variant-filled-primary w-full sm:w-auto" on:click={NewPost}>
						New Post
					</button>
				{/if}
			</div>
			<Paginator
				bind:settings={pagesettings}
				on:page={onPageChange}
				on:amount={onAmountChange}
				showFirstLastButtons={false}
				showPreviousNextButtons={true}
				class="w-full sm:w-auto mt-2 sm:mt-0"
			/>
		</nav>
	</svelte:fragment>

	<div class="flex flex-col m-2">
		<div class="overflow-y-auto h-screen">
			<slot>
				<div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
					{#each posts as post}
						<PostCard {post} />
					{/each}
				</div>
			</slot>
		</div>
	</div>
</AppShell>
<div class="card p-4 variant-filled-secondary" data-popup="popupHover">
	{#if !data.currentUser.verified}
		<p>- Verify your Account first</p>
	{/if}
	{#if data.currentUser.banned}
		<p>- Banned user can't post</p>
	{/if}
	<div class="arrow variant-filled-secondary" />
</div>
