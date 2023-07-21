<script lang="ts">
	import { page } from '$app/stores';
	import { faPaperPlane, faSquareRss } from '@fortawesome/free-solid-svg-icons';
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import type { PageData } from '../../routes/$types';

    export let data: PageData
</script>
{#if data.currentUser}
<AppRail class="hidden md:block">
	<AppRailAnchor href="/chatroom" selected={$page.url.pathname === '/chatroom'}>
		<span class='flex justify-center m-1' ><Fa icon={faPaperPlane} size="lg"/></span>
		<span>Chat Room</span>
	</AppRailAnchor>
	<AppRailAnchor href="/posts" selected={$page.url.pathname === '/posts'}>
		<span class='flex justify-center m-1' ><Fa icon={faSquareRss} size="lg"/></span>
		<span>Posts</span>
	</AppRailAnchor>
</AppRail>
{/if}