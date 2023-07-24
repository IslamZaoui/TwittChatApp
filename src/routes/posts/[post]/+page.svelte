<script lang="ts">
	import { enhance } from '$app/forms';
	import { Avatar, modalStore, type ModalSettings, Modal } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { avatarURL, linkToPostFiles } from '$lib/utils';
	import Fa from 'svelte-fa';
	import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
	import toast from 'svelte-french-toast';

	export let data: PageData;
	let likeForm: HTMLFormElement;
	let likes: number = data.postlikes;
	let liked: boolean = data.youlike?.status ?? false;
	const views = data.postviews;

	let deleteform: HTMLFormElement;

	let likestatus: 'like' | 'nolike';

	const tags = data.post.tags?.split(',').map((tag) => tag.trim());

	async function like() {
		liked = !liked;
		if (liked) {
			likestatus = 'like';
			likes++;
			likeForm.requestSubmit();
		} else {
			likestatus = 'nolike';
			likes--;
			likeForm.requestSubmit();
		}
	}

	const Confirm = async () => {
		let res = false;
		new Promise<boolean>((resolve) => {
			const modal: ModalSettings = {
				type: 'confirm',
				title: 'Post Deletion',
				body: 'Are you sure that you to delete this post?',
				response: (r: boolean) => {
					resolve(r);
				}
			};
			modalStore.trigger(modal);
		}).then((r: boolean) => {
			if (r) deleteform.requestSubmit();
		});
	};
</script>

<svelte:head>
	<title>{data.post.subject}</title>
</svelte:head>
<Modal />
<div class="flex justify-center items-center h-full">
	<div class="card shadow-md p-4 rounded-lg mb-4 w-full max-w-lg">
		<div class="grid grid-cols-2">
			<div class="flex items-center mb-2 col-span-1">
				<Avatar
					src={avatarURL(data.post.expand?.user?.id, data.post.expand?.user?.avatar)}
					alt={data.post.expand?.user?.username}
					width="w-10"
				/>
				<h3 class="font-bold ml-2">{data.post.expand?.user?.username}</h3>
			</div>
			<div class="text-gray-600 flex items-center justify-end space-x-1 col-span-1">
				<strong>{views}</strong>
				<Fa icon={faEye} />
			</div>
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

		{#if tags === undefined}
			<div class="mt-4">
				{#each tags as tag}
					<span class="bg-blue-500 text-white rounded px-2 py-1 text-sm mr-2">{tag}</span>
				{/each}
			</div>
		{/if}
		<div class="mt-4 flex items-center justify-between">
			<form
				action="?/like"
				bind:this={likeForm}
				use:enhance
				method="Post"
				class="flex items-center variant-ghost-secondary p-1 w-1/3 md:w-1/4 rounded"
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
				<span class="ml-2">{likes} {likes < 1 ? 'like' : 'likes'}</span>
			</form>
			{#if data.currentUser.id == data.post.expand?.user?.id}
				<div class="space-x-2">
					<button class="btn px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Update</button>
					<button
						class="btn px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
						on:click={Confirm}>Delete</button
					>
				</div>
				<form class='hidden' action="?/delete" use:enhance method="post" bind:this={deleteform}>
					<input class="hidden" name="id" bind:value={data.post.id} />
				</form>
			{/if}
		</div>
		<p class="text-gray-600 mt-2">Published on {data.post.updated}</p>
	</div>
</div>
