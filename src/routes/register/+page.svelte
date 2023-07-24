<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import toast, { Toaster } from 'svelte-french-toast';

	export let data: PageData;
	const { form, errors, enhance, message } = superForm(data.form);
</script>
<svelte:head>
	<title>Register</title>
</svelte:head>
<div class="container h-full mx-auto flex flex-col justify-center items-center">
    <form method="POST" use:enhance class="card w-80 p-6 space-y-6 bg-white rounded-lg shadow-lg">
        <label class="label">
            <span class="  font-semibold">Username</span>
            <input class="input mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400" type="text" name="username" placeholder="Example" bind:value={$form.username}>
            {#if $errors.username}<small class="text-red-500">{$errors.username}</small>{/if}
            {#if $message?.username.message}<small class="text-red-500">{$message?.username.message}</small>{/if}
        </label>
        <label class="label">
            <span class="  font-semibold">Email</span>
            <input class="input mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400" type="text" name="email" placeholder="Example@twitt.dz" bind:value={$form.email}>
            {#if $errors.email}<small class="text-red-500">{$errors.email}</small>{/if}
            {#if $message?.email.message}<small class="text-red-500">{$message?.email.message}</small>{/if}
        </label>
        <label class="label">
            <span class="  font-semibold">Password</span>
            <input class="input mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400" type="password" name="password" placeholder="********" bind:value={$form.password}>
            {#if $errors.password}<small class="text-red-500">{$errors.password}</small>{/if}
        </label>
        <label class="label">
            <span class="  font-semibold">Confirm Password</span>
            <input class="input mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400" type="password" name="passwordConfirm" placeholder="********" bind:value={$form.passwordConfirm}>
            {#if $errors.passwordConfirm}<small class="text-red-500">{$errors.passwordConfirm}</small>{/if}
        </label>
        <button class="btn w-full variant-filled-secondary hover:variant-ghost-secondary text-white font-semibold py-2 rounded-md" type="submit">
            <span>Create Account</span>
        </button>
        <a href="/login" class="text-blue-500 hover:underline text-center">I have an account</a>
    </form>
</div>

