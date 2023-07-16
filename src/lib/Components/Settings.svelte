<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData, ActionData } from '../../routes/account/$types';
	import toast, { Toaster } from 'svelte-french-toast';
	import {
		Modal,
		modalStore,
		type ModalComponent,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import ResetPassword from './ResetPassword.svelte';

	export let data: PageData;
	export let form: ActionData;

	const resetpass: ModalComponent = {
		ref: ResetPassword
	};

	function reset() {
		const modal: ModalSettings = {
			type: 'component',
			component: resetpass
		};
		modalStore.trigger(modal);
	}

	let username = data.currentUser.username;

	const {
		errors: emailerror,
		enhance: emailenhance,
		message: emailmsg
	} = superForm(data.FormChangeEmail);
	const {
		errors: usererror,
		enhance: userenhance,
		message: usermsg
	} = superForm(data.FormChangeUsername);
	const {
		errors: passerror,
		enhance: passenhance,
		message: passmsg
	} = superForm(data.FormChangePassword);

	$: if ($emailmsg) toast($emailmsg);

	$: if ($usermsg) toast($usermsg);

	$: if ($passmsg) toast($passmsg);

	$: if (form?.error) toast.error(form.error);
	$: if (form?.success) toast.success(form?.success);
</script>

<Modal />
<div class="container mx-auto max-w-md p-4">
	<div class="variant-filled-surface rounded-lg shadow-lg p-4 mb-4">
		<h2 class="text-xl font-semibold mb-2">Email</h2>
		<form class="flex items-center space-x-2" method="post" use:emailenhance action="?/ChangeEmail">
			<input class="input flex-grow h-10 px-3 rounded-md" name="email" placeholder="New Email" />
			<button class="btn variant-filled-secondary hover:variant-ghost-secondary text-white"
				>Change</button
			>
		</form>
		{#if $emailerror.email}<small class="text-error-300">{$emailerror.email}</small>{/if}
	</div>
	<div class="variant-filled-surface rounded-lg shadow-lg p-4 mb-4">
		<h2 class="text-xl font-semibold mb-2">Username</h2>
		<form
			class="flex items-center space-x-2"
			method="post"
			use:userenhance
			action="?/ChangeUsername"
		>
			<input
				class="input flex-grow h-10 px-3 rounded-md"
				name="username"
				placeholder="Username"
				bind:value={username}
			/>
			<button class="btn variant-filled-secondary hover:variant-ghost-secondary text-white"
				>Change</button
			>
		</form>
		{#if $usererror.username}<small class="text-error-300">{$usererror.username}</small>{/if}
	</div>
	<div class="variant-filled-surface rounded-lg shadow-lg p-4">
		<h2 class="text-xl font-semibold mb-2">Password</h2>
		<form class="space-y-2" method="post" use:passenhance action="?/ChangePassword">
			<input
				class="input h-10 px-3 rounded-md"
				name="oldPassword"
				placeholder="Old Password"
				type="password"
			/>
			{#if $passerror.oldPassword}<small class="text-error-300">{$passerror.oldPassword}</small
				>{/if}
			<input
				class="input h-10 px-3 rounded-md"
				name="password"
				placeholder="New Password"
				type="password"
			/>
			{#if $passerror.password}<small class="text-error-300">{$passerror.password}</small>{/if}
			<input
				class="input h-10 px-3 rounded-md"
				placeholder="Confirm New Password"
				type="password"
				name="passwordConfirm"
			/>
			{#if $passerror.passwordConfirm}<small class="text-error-300"
					>{$passerror.passwordConfirm}<br /></small
				>{/if}
			<button class="btn variant-filled-secondary hover:variant-ghost-secondary text-white"
				>Change</button
			>
			<a href="#" on:click={reset} class="text-blue-500 hover:underline text-center"
				>Forget Password?</a
			>
		</form>
	</div>
</div>
