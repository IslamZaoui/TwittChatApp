<script lang="ts">
	import { enhance } from '$app/forms';
	import { modalStore } from '@skeletonlabs/skeleton';

	export let parent: any;

	let Form: HTMLFormElement;
	function onFormSubmit(): void {
		Form.requestSubmit()
		modalStore.close();
	}

	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>Password Reset</header>
		<article>Enter your account's Email:</article>
		<form
			class="modal-form {cForm}"
			method="post"
			use:enhance
			action="?/ResetPassword"
			enctype="multipart/form-data"
			bind:this={Form}
		>
			<input class="input" name='email' type="email" placeholder="Email">
		</form>
		<footer class="modal-footer {parent.regionFooter}">
            <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Submit</button>
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}
				>{parent.buttonTextCancel}</button
			>
		</footer>
	</div>
{/if}
