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