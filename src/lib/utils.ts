import { env } from "$env/dynamic/public";

export const serializeNonPOJOs = <T>(obj: T): T => {
  return structuredClone(obj);
};

export async function checkConnection(): Promise<boolean> {
  try {
    const response = await fetch(env.PUBLIC_POCKETBASE_URL + '/api/health')
    if (response.status == 200) {
      return true
    } else {
      return false
    }
  }
  catch (Error) {
    return false
  }
}

export function avatarURL(id: string | undefined, avatar: string | undefined) {
  if (id != undefined && avatar != undefined)
    return env.PUBLIC_POCKETBASE_URL + "/api/files/users/" + id + "/" + avatar

  return ""
}

export function limitStringWithEllipsis(text: string | undefined): string | undefined {
  const maxLength = 20
  if (text === undefined)
    return text
  if (text.length <= maxLength) {
    return text;
  }

  const trimmedText = text.substring(0, maxLength - 3);
  return trimmedText + "... click to see more";
}

export function linkToPostFiles(filename:string,postid:string|undefined){
  return env.PUBLIC_POCKETBASE_URL + "/api/files/posts/" + postid + "/" + filename
}

export function searchPosts(posts: Post[], searchQuery: string[]): Post[] {
  const normalizedQueries = searchQuery.map((query) => query.toLowerCase().trim());
  return posts.filter((post) => {
    return (
      normalizedQueries.some((query) => post.subject?.toLowerCase().includes(query)) ||
      normalizedQueries.some((query) => post.expand?.user?.username.toLowerCase().includes(query)) ||
      normalizedQueries.some((query) => post.Text?.toLowerCase().includes(query)) ||
      (post.tags && normalizedQueries.some((query) => post.tags?.toLowerCase().includes(query)))
    );
  });
}

export function FullPostInfo(posts: Post[], postLikes: PostLike[]): PostFull[] {
	const postLikesCountMap: { [postId: string]: number } = {};
	const postLikesTrueCountMap: { [postId: string]: number } = {};

	// Count likes and views for each post
	for (const like of postLikes) {
		if (typeof like.post === "string") {
			const postId = like.post;

			if (postLikesCountMap[postId] === undefined) {
				postLikesCountMap[postId] = 1;
			} else {
				postLikesCountMap[postId]++;
			}

			if (like.status === true) {
				if (postLikesTrueCountMap[postId] === undefined) {
					postLikesTrueCountMap[postId] = 1;
				} else {
					postLikesTrueCountMap[postId]++;
				}
			}
		}
	}

	// Combine posts and likes data
	const postFullList: PostFull[] = posts.map((post) => {
		const postId = post.id || ""; // Set a default empty string if post.id is undefined
		return {
			...post,
			likes: postLikesCountMap[postId] || 0,
			views: postLikesTrueCountMap[postId] || 0,
		};
	});

	return postFullList;
}