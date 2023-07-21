<script lang="ts">
	import PostCard from '$lib/Components/PostCard.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let pagenum = 0;
	for (const post in data.posts) {
		console.log(post);
	}
</script>

<div class="flex">
	{#each data.posts as post}
		<PostCard {post} />
	{/each}
</div>
