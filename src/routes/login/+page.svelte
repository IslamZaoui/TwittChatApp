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
<div class="container h-screen mx-auto flex justify-center items-center">
	<form method="POST" use:enhance class="card w-80 p-6 space-y-6 bg-white rounded-lg shadow-lg">
		<label class="label">
			<span class="font-semibold">Email</span>
			<input
				class="input mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
				type="text"
				name="email"
				placeholder="Example@twitt.dz"
				bind:value={$form.email}
			/>
			{#if $errors.email}<small class="text-red-500">{$errors.email}</small>{/if}
		</label>
		<label class="label">
			<span class="font-semibold">Password</span>
			<input
				class="input mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
				type="password"
				name="password"
				placeholder="********"
				bind:value={$form.password}
			/>
			{#if $errors.password}<small class="text-red-500">{$errors.password}</small>{/if}
		</label>
		<button
			class="btn w-full variant-filled-secondary hover:variant-ghost-secondary text-white font-semibold py-2 rounded-md"
			type="submit"
		>
			<span>Login</span>
		</button>
		<a href="/register" class="text-blue-500 hover:underline text-center">Don't have an account?</a>
	</form>
</div>
