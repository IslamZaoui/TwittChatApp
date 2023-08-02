<script lang="ts">
	import { avatarURL } from "$lib/utils";
	import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
	import { Avatar } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";
	import Fa from "svelte-fa";

	export let post: PostFull;
	let likeCount = post.views;
	let viewCount = post.likes;

</script>

<a class="card variant-filled-surface h-full card-hover overflow-hidden rounded-lg shadow-lg" href="/posts/{post.id}">
	<header class="p-4 space-y-4">
		<h6 class="text-blue-500 font-bold uppercase text-sm tracking-wide">{post.tags}</h6>
		<h3 class="text-xl font-bold leading-tight" data-toc-ignore>{post.subject}</h3>
	</header>
	<hr class="opacity-50" />
	<footer class="p-4 flex flex-col justify-start items-start space-y-3">
		<div class="flex items-center space-x-2">
			<Avatar src={avatarURL(post.expand?.user?.id, post.expand?.user?.avatar)} width="w-8" />
			<a href="/{post.expand?.user?.username}"><h6 class="text-sm font-bold">{post.expand?.user?.username}</h6></a>
		</div>
		<small class="text-gray-600">Posted on {post.created}</small>
	</footer>
	
	<!-- Bottom Bar Grid -->
	<div class="grid grid-cols-2 p-4 border-t border-gray-200">
		<div class="flex items-center space-x-2">
			<span class="flex items-center space-x-2">
				<strong>{likeCount}</strong>
				<Fa icon={faHeart} color="red" />
			</span>
		</div>
		<div class="text-gray-600 flex items-center justify-end space-x-2">
			<strong>{viewCount}</strong>
			<Fa icon={faEye} />
		</div>
	</div>
</a>
