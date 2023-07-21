<script lang="ts">
	import { avatarURL } from "$lib/utils";
	import { Avatar } from "@skeletonlabs/skeleton";

	export let post: Post;
</script>

<a class="card variant-filled-surface w-full h-full card-hover overflow-hidden rounded-lg shadow-lg m-3" href="/posts/{post.id}">
	<header class="p-4 space-y-4">
		<h6 class="text-blue-500 font-bold uppercase text-sm tracking-wide">{post.tags}</h6>
		<h3 class="text-xl font-bold leading-tight" data-toc-ignore>{post.subject}</h3>
	</header>
	<hr class="opacity-50" />
	<footer class="p-4 flex flex-col justify-start items-start space-y-3">
		<div class="flex items-center space-x-2">
			<Avatar src={avatarURL(post.expand?.user?.id, post.expand?.user?.avatar)} width="w-8" />
			<h6 class="text-sm font-bold">{post.expand?.user?.username}</h6>
		</div>
		<small class="text-gray-600">Posted on {post.created}</small>
	</footer>
</a>
