<script lang="ts">
	import { message } from 'sveltekit-superforms/server';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import Fa from 'svelte-fa';
	import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
	import { Avatar, focusTrap } from '@skeletonlabs/skeleton';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import { pb } from '$lib/pb';
	import { avatarURL } from '$lib/utils';
	import toast, { Toaster } from 'svelte-french-toast';
	const scrollToBottom = async (node: HTMLDivElement) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};
	let element: HTMLDivElement;
	export let data: PageData;
	let messages = data.messages;

	const { form, errors, enhance } = superForm(data.form);
	let unsub: () => void;
	onMount(async () => {
		if (data.currentUser.verified) {
			unsub = await pb.collection('messages').subscribe('*', async ({ action, record }) => {
				if (action === 'create') {
					const user = await pb.collection('users').getOne(record.user);
					record.expand = { user };
					messages = [...messages, record];
				}
				if (action === 'delete') messages = messages.filter((m) => m.id !== record.id);
				if (action === 'update') {
					messages = messages.map((item) => {
						if (item.id === record.id) {
							return { ...item, ...record };
						}
						return item;
					});
				}
				scrollToBottom(element);
			});
		}
	});

	onDestroy(() => {
		unsub?.();
	});

	afterUpdate(() => {
		if (messages) {
			scrollToBottom(element);
		}
	});

	$: if (messages && element) {
		scrollToBottom(element);
	}

	async function verify() {
		const response = (await fetch('/verification', {
			method: 'POST'
		}).then((x) => x.json())) as { type: 'success' | 'error'; message: string };
		if (response.type == 'success') {
			toast.success(response.message);
		} else {
			toast.error(response.message);
		}
	}
</script>

<Toaster />
<svelte:head>
	<title>Chat Room</title>
</svelte:head>
{#if data.currentUser.verified}
	<div class="h-full grid grid-rows-[1fr_auto] gap-1">
		<div
			bind:this={element}
			on:keydown={(event) => event.key != 'Enter'}
			class="max-h-[80vh] p-6 overflow-y-auto space-y-4"
		>
			{#each messages as msg (msg.id)}
				{#if msg.expand?.user?.username == data.currentUser.username}
					<div class="grid grid-cols-[auto_1fr] gap-2">
						<Avatar src={avatarURL(msg.expand?.user?.id, msg.expand?.user?.avatar)} width="w-12" />
						<div class="card p-4 variant-soft-primary rounded-tl-none space-y-2">
							<header class="flex justify-between items-center">
								<p class="font-bold space-x-2">
									<a href="/{msg.expand?.user?.username}">{msg.expand?.user?.username}</a>
									{#if msg.expand?.user?.banned}<small class="text-red-500">Banned</small>{/if}
								</p>
								<small class="opacity-50">{msg.created}</small>
							</header>
							<p>{msg.text}</p>
						</div>
					</div>
				{:else}
					<div class="grid grid-cols-[1fr_auto] gap-2">
						<div class="card p-4 variant-soft rounded-tr-none space-y-2">
							<header class="flex justify-between items-center flex-row-reverse">
								<p class="font-bold space-x-2">
									<a href="/{msg.expand?.user?.username}">{msg.expand?.user?.username}</a>
									{#if msg.expand?.user?.banned}<small class="text-red-500">Banned</small>{/if}
								</p>
								<small class="opacity-50">{msg.created}</small>
							</header>
							<p>{msg.text}</p>
						</div>
						<Avatar src={avatarURL(msg.expand?.user?.id, msg.expand?.user?.avatar)} width="w-12" />
					</div>
				{/if}
			{/each}
		</div>
		<div class="bg-surface-500/30 p-4 w-full">
			{#if !data.banned}
				<form
					data-sveltekit-replacestate
					data-sveltekit-keepfocus
					use:focusTrap={true}
					use:enhance
					method="POST"
					class="input-group input-group-divider grid-cols-[1fr_auto] rounded-container-token"
				>
					<input
						class="bg-transparent input border-0 ring-0 w-full"
						name="text"
						type="text"
						required
						autofocus
						bind:value={$form.text}
						placeholder={$errors.text ? '' + $errors.text : 'Write a message...'}
					/>
					<button type="submit" class="variant-filled-primary space-x-2">
						<Fa icon={faPaperPlane} /><span>Send</span>
					</button>
				</form>
			{:else}
				<span><strong class="text-error-500">You are banned from the chat</strong></span>
			{/if}
		</div>
	</div>
{:else}
	<div class="container h-full mx-auto flex flex-col justify-center items-center">
		<div class="flex flex-col variant-ghost-error p-5 justify-center items-center space-y-5">
			<strong class="text-2xl">Verify your Account to Access Chat</strong>
			<button on:click={verify} class="btn variant-ghost-primary">Verifiy your email</button>
		</div>
	</div>
{/if}
