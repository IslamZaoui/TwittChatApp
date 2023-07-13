<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { ActionData, PageData } from './$types';
	import Fa from 'svelte-fa';
	import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { afterUpdate } from 'svelte';

	export let data: PageData;
	export let action: ActionData;
	$: messages = action?.messages ?? data.messages;
	const { form, errors, enhance, message } = superForm(data.form);
	let element: HTMLDivElement;

	// Either afterUpdate()
	afterUpdate(() => {
		if (messages) scrollToBottom(element);
	});

	$: if (messages && element) {
		scrollToBottom(element);
	}

	const scrollToBottom = async (node: HTMLDivElement) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};
</script>

<div class="h-full grid grid-rows-[1fr_auto] gap-1">
	<div bind:this={element} class="max-h-[560px] p-4 overflow-y-auto space-y-4">
		{#each messages as msg (msg.id)}
			{#if msg.expand?.user?.username == data.currentUser.username}
				<div class="grid grid-cols-[auto_1fr] gap-2">
					<Avatar
						src="https://api.dicebear.com/6.x/lorelei/svg?seed=${msg.expand?.user?.username}"
						width="w-12"
					/>
					<div class="card p-4 variant-soft-primary rounded-tl-none space-y-2">
						<header class="flex justify-between items-center">
							<p class="font-bold space-x-2">
								<span>{msg.expand?.user?.username}</span>{#if msg.expand?.user?.banned}<small
										class="text-red-500">Banned</small
									>{/if}
							</p>
							<small class="opacity-50">{msg.created}</small>
						</header>
						<p>{msg.text}</p>
					</div>
				</div>
			{:else}
				<div class="grid grid-cols-[1fr_auto] gap-2">
					<div class="card p-4 variant-soft rounded-tr-none space-y-2">
						<header class="flex justify-between items-center">
							<p class="font-bold space-x-2">
								<span>{msg.expand?.user?.username}</span>{#if msg.expand?.user?.banned}<small
										class="text-red-500">Banned</small
									>{/if}
							</p>
							<small class="opacity-50">{msg.created}</small>
						</header>
						<p>{msg.text}</p>
					</div>
					<Avatar
						src="https://api.dicebear.com/6.x/lorelei/svg?seed=${msg.expand?.user?.username}"
						width="w-12"
					/>
				</div>
			{/if}
		{/each}
	</div>
	<div class="bg-surface-500/30 p-4">
		{#if !data.banned}
			<form
				use:enhance
				method="POST"
				class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token"
			>
				<button type="submit" class="input-group-shim">Message</button>
				<textarea
					class="bg-transparent border-0 ring-0"
					name="text"
					required
					bind:value={$form.text}
					placeholder={$errors.text ? '' + $errors.text : 'Write a message...'}
					rows="1"
				/>
				<input type="text" class="hidden" bind:value={data.currentUser.id} />
				<button type="submit" class="variant-filled-primary space-x-2"
					><Fa icon={faPaperPlane} /><span>Send</span></button
				>
			</form>
		{:else}
			<span><strong class="text-error-500">You are banned form the chat</strong></span>
		{/if}
	</div>
</div>
