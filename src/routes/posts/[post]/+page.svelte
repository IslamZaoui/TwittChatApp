<script lang="ts">
	import { enhance } from '$app/forms';
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { avatarURL, linkToPostFiles } from '$lib/utils';
	import Fa from 'svelte-fa';
	import { faHeart } from '@fortawesome/free-solid-svg-icons';

	export let data: PageData;
	let likeForm: HTMLFormElement;
	let likes: number = data.postlikes;
	let liked: boolean = data.youlike?.status ?? false;

	let likestatus: 'like' | 'nolike';

	const tags = data.post.tags?.split(',').map((tag) => tag.trim());

	async function like() {
		liked = !liked
		if (liked) {
			likestatus = 'like';
			likes++
			likeForm.requestSubmit();
		} else {
			likestatus = 'nolike';
			likes--
			likeForm.requestSubmit();
		}
	}
</script>
<svelte:head>
	<title>{data.post.subject}</title>
</svelte:head>
<div class="flex justify-center items-center h-full">
	<div class="card shadow-md p-4 rounded-lg mb-4 w-full max-w-lg">
		<div class="flex items-center mb-2">
			<Avatar
				src={avatarURL(data.post.expand?.user?.id, data.post.expand?.user?.avatar)}
				alt={data.post.expand?.user?.username}
				width="w-10"
			/>
			<h3 class="font-bold ml-2">{data.post.expand?.user?.username}</h3>
		</div>
		<h1 class="text-xl font-semibold mb-2">{data.post.subject}</h1>
		<p class="variant-filled-surface p-3 rounded">{data.post.Text}</p>
		{#if data.post.files && data.post.files.length > 0}
			<div class="mt-4">
				<h2 class="font-semibold mb-1">Attached Files:</h2>
				{#each data.post.files as file}
					<p>
						<a
							href={linkToPostFiles(file, data.post.id)}
							target="_blank"
							class="text-blue-500 hover:underline">{file}</a
						>
					</p>
				{/each}
			</div>
		{/if}

		{#if tags}
			<div class="mt-4">
				{#each tags as tag}
					<span class="bg-blue-500 text-white rounded px-2 py-1 text-sm mr-2">{tag}</span>
				{/each}
			</div>
		{/if}
		<form
			action="?/like"
			bind:this={likeForm}
			use:enhance
			method="Post"
			class="mt-4 flex items-center variant-ghost-secondary p-1 w-1/4 rounded"
		>
			<button
				class="px-2 py-1 hover:underline {liked ? 'text-red-500' : 'text-gray-500'}"
				type="submit"
				on:click={like}
			>
				<Fa icon={faHeart} />
			</button>
			<input class="hidden" type="text" name="like" bind:value={likestatus} />
			<input class="hidden" type="text" name="id" value={data.youlike?.id ?? ''} />
			<span class="ml-2">{likes} Likes</span>
		</form>
		<p class="text-gray-600 mt-2">Published on {data.post.updated}</p>
	</div>
</div>
