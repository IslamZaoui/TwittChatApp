<script lang="ts">
	import { enhance } from '$app/forms';

	export let parent: any;

	let form: HTMLFormElement;
	import { FileDropzone, modalStore } from '@skeletonlabs/skeleton';

	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>Change Avatar</header>
		<article>Upload your avatar here:</article>
		<form
			class="modal-form {cForm}"
			method="post"
			use:enhance
			action="?/ChnageAvatar"
			enctype="multipart/form-data"
			bind:this={form}
		>
			<FileDropzone
				name="avatar"
				accept="image/*"
				required
				on:change={() => {
					form.requestSubmit();
					modalStore.close();
				}}
			/>
		</form>
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}
				>{parent.buttonTextCancel}</button
			>
		</footer>
	</div>
{/if}
