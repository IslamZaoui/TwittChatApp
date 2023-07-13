<script lang="ts">
	import { focusTrap } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import toast, { Toaster } from 'svelte-french-toast';
	import { json } from '@sveltejs/kit';

	export let data: PageData;
	let isFocused: boolean = true;
	const { form, errors, enhance, message } = superForm(data.form);
</script>

<Toaster />
<div class="container h-full mx-auto flex flex-col justify-center items-center">
	<form method="POST" use:enhance class="card p-4 space-y-4" use:focusTrap={isFocused}>
		<label class="label">
			<span>Username</span>
			<input
				class="input"
				type="text"
				name="username"
				placeholder="Example"
				bind:value={$form.username}
			/>
			{#if $errors.username}<small class="text-error-300">{$errors.username}</small>{/if}
			{#if $message?.username.message}<small class="text-error-300">{$message?.username.message}</small>{/if}
		</label>
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
			{#if $message?.email.message}<small class="text-error-300">{$message?.email.message}</small>{/if}
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
		<label class="label">
			<span>Confirm Password</span>
			<input
				class="input"
				type="password"
				name="passwordConfirm"
				placeholder="********"
				bind:value={$form.passwordConfirm}
			/>
			{#if $errors.passwordConfirm}<small class="text-error-300">{$errors.passwordConfirm}</small
				>{/if}
		</label>
		<button class="btn variant-filled-primary" type="submit">
			<span>Create Account</span>
		</button>
		<a href="/login">I have an account</a>
	</form>
</div>
