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