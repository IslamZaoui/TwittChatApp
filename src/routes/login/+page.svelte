<script lang="ts">
	import { Modal, modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import type { ActionData, PageData } from './$types';
	import toast, { Toaster } from 'svelte-french-toast';
	import ResetPassword from '$lib/Components/ResetPassword.svelte';
	export let data: PageData;
	export let form : ActionData
	const { form:form1, errors, enhance, message } = superForm(data.form);

	$: if ($message) toast.error($message);
	$: if(form?.error) toast.error(form?.error);
	$: if(form?.success) toast.success("Password Reset Request sent to your email");


	const resetpass: ModalComponent = {
		ref: ResetPassword,
	};

	function reset() {
		const modal: ModalSettings = {
			type: 'component',
			component: resetpass
		};
		modalStore.trigger(modal);
	}
</script>

<Toaster />
<Modal />
<svelte:head>
	<title>Login</title>
</svelte:head>
<div class="container h-screen mx-auto flex justify-center items-center">
	<form method="POST" action="?/Login" use:enhance class="card w-80 p-6 space-y-6 bg-white rounded-lg shadow-lg">
		<label class="label">
			<span class="font-semibold">Email</span>
			<input
				class="input mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
				type="text"
				name="email"
				placeholder="Example@twitt.dz"
				bind:value={$form1.email}
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
				bind:value={$form1.password}
			/>
			{#if $errors.password}<small class="text-red-500">{$errors.password}</small>{/if}
		</label>
		<button
			class="btn w-full variant-filled-secondary hover:variant-ghost-secondary text-white font-semibold py-2 rounded-md"
			type="submit"
		>
			<span>Login</span>
		</button>
		<a href="/register" class="text-blue-500 hover:underline text-center">Don't have an account?</a
		><br />
		<a href="#" on:click={reset} class="text-blue-500 hover:underline text-center">Forget Password?</a>
	</form>
</div>
