<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { faPaperPlane, faSquareRss } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let currentuser: User | undefined;

	function Selected(): void {}
	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4 space-y-5" on:load={Selected}>
	<ul>
		<li>
			{#if currentuser}
				<a href="/account" on:click={drawerClose}>
					<span>Account</span>
				</a>
				<a href="/chatroom" on:click={drawerClose}>
					<span class="m-1"><Fa icon={faPaperPlane} size="lg" /></span>
					<span>Chat Room</span>
				</a>
				<a href="/posts" on:click={drawerClose}>
					<span class="m-1"><Fa icon={faSquareRss} size="lg" /></span>
					<span>Posts</span>
				</a>
			{/if}
		</li>
	</ul>
</nav>
