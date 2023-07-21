<script lang="ts">
	import PostCard from '$lib/Components/PostCard.svelte';
	import {
		AppShell,
		InputChip,
		Modal,
		Paginator,
		type ModalComponent,
		type ModalSettings,
		modalStore
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
</script>

<Modal />
<AppShell>
	<svelte:fragment slot="pageHeader">
		<nav class="card p-2 m-2 rounded-none flex flex-row space-x-5">
			<InputChip
				rounded="rounded"
				class="w-1/4"
				bind:value={Searchlist}
				name="chips"
				placeholder="Search..."
			/>
			<button class="btn variant-filled-primary" on:click={NewPost}>New Post</button>
			<Paginator
				bind:settings={pagesettings}
				on:page={onPageChange}
				on:amount={onAmountChange}
				showFirstLastButtons={false}
				showPreviousNextButtons={true}
			/>
		</nav>
	</svelte:fragment>
	<slot>
		<div class="flex">
			{#each posts as post}
				<PostCard {post} />
			{/each}
		</div>
	</slot>
</AppShell>
