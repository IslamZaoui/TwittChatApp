<script lang="ts">
	import { page } from '$app/stores';
	import { avatarURL } from '$lib/utils';
	import { Avatar, FileButton, InputChip, modalStore } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from '../../routes/posts/$types';
	import toast, { Toaster } from 'svelte-french-toast';

	export let parent: any;
	let PostForm: HTMLFormElement;
	let data = $page.data as PageData;

	const { form, errors, enhance, message } = superForm(data.form);

	async function onFormSubmit() {
		await PostForm.requestSubmit();
		modalStore.close();
	}
	function onInvalidHandler(event: any): void {
		toast.error(`"${event.detail.input}" is an invalid value. Please try again!`)
	}
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
</script>
<Toaster/>
{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>New Post</header>
		<form
			use:enhance
			bind:this={PostForm}
			action="?/newpost"
			method="Post"
			enctype="multipart/form-data"
			class="flex justify-center items-center h-full"
		>
			<div class="card shadow-md p-4 rounded-lg mb-4 w-full max-w-lg">
				<div class="flex items-center mb-2">
					<Avatar
						src={avatarURL($page.data.currentUser.id, $page.data.currentUser.avatar)}
						alt={$page.data.currentUser.username}
						width="w-10"
					/>
					<h3 class="font-bold ml-2">{$page.data.currentUser.username}</h3>
				</div>
				<h1 class="text-xl font-semibold mb-2">
					<input
						type="text"
						name="subject"
						class="input w-1/2 rounded"
						bind:value={$form.subject}
						placeholder="Subject..."
						maxlength={30}
						minlength={5}
					/>
				</h1>
				{#if $errors.subject}<small class="text-red-500">{$errors.subject}</small>{/if}
				<textarea
					class="input variant-filled-surface p-3 rounded"
					bind:value={$form.Text}
					name="Text"
					placeholder="Text..."
					minlength={5}
				/>
				{#if $errors.Text}<small class="text-red-500">{$errors.Text}</small>{/if}
				<div class="mt-4">
					<h2 class="font-semibold mb-1">Attached Files:</h2>
					<p>
						<FileButton name="files" multiple>Select Files</FileButton>
					</p>
				</div>
				<div class="mt-4">
					<InputChip
						name="tags"
						rounded="rounded"
						bind:value={$form.tags}
						chips="bg-blue-500 text-white rounded"
						placeholder="Tags..."
						max={4}
						minlength={2}
						maxlength={10}
						on:invalid={onInvalidHandler}
					/>
					{#if $errors.tags}<small class="text-red-500">{$errors.tags}</small>{/if}
				</div>
			</div>
		</form>
		<footer class="modal-footer my-5 {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}
				>{parent.buttonTextCancel}</button
			>
			<button class="btn {parent.buttonPositive}" type="submit" on:click={onFormSubmit}>Post It</button>
		</footer>
	</div>
{/if}
