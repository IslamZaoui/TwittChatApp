<script lang="ts">
	import { avatarURL } from "$lib/utils";
	import { Avatar } from "@skeletonlabs/skeleton";

    export let post : Post
</script>
<a class="m-3 card variant-filled-surface w-35 h-90 card-hover overflow-hidden" href="/posts/{post.id}">
    <header class="p-4 space-y-4">
        <h6 class="h6">{post.tags}</h6>
        <h3 class="h3" data-toc-ignore>{post.subject}</h3>
    </header>
    <hr class="opacity-50" />
    <footer class="p-4 flex flex-col justify-start items-center space-y-3">
        <div class="flex-auto space-x-2 flex justify-between items-center">
            <Avatar src={avatarURL(post.expand?.user?.id,post.expand?.user?.avatar)}  width="w-8" />
            <h6 class="font-bold">By {post.expand?.user?.username}</h6>
        </div>
        <small>On {post.created}</small>
    </footer>
</a>