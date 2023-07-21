<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';

	export let parent: any;

	const cButton = 'fixed top-4 right-4 z-50 font-bold shadow-xl';
	const cImage = 'max-w-[90%] max-h-[90%] rounded-container-token overflow-hidden shadow-xl';
</script>

{#if $modalStore[0]}
	<button class="btn-icon variant-filled {cButton}" on:click={parent.onClose}>×</button>
	<img
		src="https://media.istockphoto.com/id/1140117165/vector/under-construction-design-website-development-concept-warning-tape-banner.jpg?s=612x612&w=0&k=20&c=2Y2xXY2EdNsMvhrO8ijdsknuQRy5Ug_wOzi220CpU8g="
		class={cImage}
		alt="Example"
	/>
{/if}
