<script lang="ts">
	import Fa from 'svelte-fa';
	import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
	import { faGithub } from '@fortawesome/free-brands-svg-icons';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import logo from '$lib/favicon.png'
	export let data: PageData;
</script>

<div class="page py-24">
	<div class="container max-w-xl flex flex-col items-center mx-auto text-center">
		<div
			class="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-3 mb-10 text-white"
		>
		<a href="/" class="flex space-x-1 items-center">
			<img src={logo} class="aspect-square w-16" alt="logo" />
			<strong class="text-5xl uppercase">Twitt</strong>
		</a>
		</div>
		<div class="logo flex flex-col items-center justify-center">
			<section class="img-bg" />
			<h1 class="font-bold text-3xl md:text-5xl">Next Gen Online Chat Web App</h1>
			<p class="mt-10 text-lg md:text-xl max-w-prose">
				Simple, Laggy, and Vulnerable by default.<br />Powered by
				<a
					href="https://kit.svelte.dev/"
					class="font-medium underline decoration-dotted underline-offset-4">SvelteKit</a
				>
				and
				<a
					href="https://pocketbase.io/"
					class="font-medium underline decoration-dotted underline-offset-4">PocketBase</a
				>.
			</p>
		</div>
		<div class="flex items-center mt-10 space-x-4">
			<button
				class="btn variant-filled-primary"
				on:click={() => {
					goto(data.currentUser ? '/chatroom' : '/login');
				}}
			>
				<Fa icon={faPaperPlane} />
				<span>{data.currentUser ? 'Start Chating' : 'Login and Start Chating'}</span>
			</button>
			<a href="https://github.com/zicoding2/TwittChatApp" target="_blank" class="flex items-center space-x-2 text-gray-500">
				<Fa icon={faGithub} size="lg" />
				<span>Source</span>
			</a>
		</div>
	</div>
</div>

<style lang="postcss">
	.img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite, glow 5s linear infinite;
	}
	.page {
		background-image: radial-gradient(
				at 0% 0%,
				rgba(var(--color-secondary-500) / 0.33) 0px,
				transparent 50%
			),
			radial-gradient(at 98% 1%, rgba(var(--color-error-500) / 0.33) 0px, transparent 50%);
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
