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

	let pagenum = ($page.url.searchParams.get('page') ?? data.page) as number;
	let perpage = ($page.url.searchParams.get('items') ?? data.perpage) as number;

	let posts: Post[] = [];

	$: if (Searchlist.length != 0) {
		posts = searchPosts(data.posts, Searchlist);
	} else {
		posts = data.posts;
	}

	let pagesettings = {
		offset: 0,
		limit: data.perpage,
		size: data.totalitems,
		amounts: [5, 10, 20, 50]
	};

	function onPageChange(e: CustomEvent): void {
		pagenum = e.detail + 1;
		goto('/posts?page=' + pagenum + '&items=' + perpage);
	}

	function onAmountChange(e: CustomEvent): void {
		perpage = e.detail;
		goto('/posts?page=' + pagenum + '&items=' + perpage);
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
<div>
	<nav class="card p-2 m-2 rounded flex space-x-2">
		<InputChip
			rounded="rounded"
			class="w-full "
			bind:value={Searchlist}
			name="chips"
			placeholder="Search..."
		/>
		<div class=" max-w-min">
			{#if data.currentUser.banned || !data.currentUser.verified}
				<button class="btn variant-filled-primary [&>*]:pointer-events-none"> New Post </button>
			{:else}
				<button class="btn variant-filled-primary" on:click={NewPost}> New Post </button>
			{/if}
		</div>
	</nav>

	<div class="md:max-h-[69vh] max-h-[63vh] overflow-y-auto">
		<div class="mx-5 h-screen">
			<div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
				{#each posts as post}
					<PostCard {post} />
				{/each}
			</div>
		</div>
	</div>

	<Paginator
		bind:settings={pagesettings}
		on:page={onPageChange}
		on:amount={onAmountChange}
		showFirstLastButtons={false}
		showPreviousNextButtons={true}
		class="card p-2 m-2 rounded"
	/>
</div>
<div class="card p-4 variant-filled-secondary" data-popup="popupHover">
	{#if !data.currentUser.verified}
		<p>- Verify your Account first</p>
	{/if}
	{#if data.currentUser.banned}
		<p>- Banned user can't post</p>
	{/if}
	<div class="arrow variant-filled-secondary" />
</div>
