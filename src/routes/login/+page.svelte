<script lang="ts">
	import { focusTrap } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import type { ActionData, PageData } from './$types';
	import toast, { Toaster } from 'svelte-french-toast';
	export let data: PageData;
	let isFocused: boolean = true;
	const { form, errors, enhance, message } = superForm(data.form);

	$: if ($message) toast.error($message);
</script>

<Toaster />
<div
	class="container h-full mx-auto flex flex-col justify-center items-center"
	use:focusTrap={isFocused}
>
	<form method="POST" use:enhance class="card p-4 space-y-4">
		<label class="label">
			<span>Email</span>
			<input
				class="input"
				type="text"
				name="email"
				placeholder="Example@twitt.dz"
				bind:value={$form.email}
			/>
			{#if $errors.email}<small class="text-error-300">{$errors.email}</small>{/if}
		</label>
		<label class="label">
			<span>Password</span>
			<input
				class="input"
				type="password"
				name="password"
				placeholder="********"
				bind:value={$form.password}
			/>
			{#if $errors.password}<small class="text-error-300">{$errors.password}</small>{/if}
		</label>
		<button class="btn variant-filled-primary" type="submit">
			<span>Login</span>
		</button>
		<a href="/register">Don't have account?</a>
	</form>
</div>
