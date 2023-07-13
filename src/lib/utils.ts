import { env } from "$env/dynamic/public";
import badWords from './DirtyWords.json';

export async function censorBadWords(text:string) {
  try {

    const words = badWords.RECORDS.map(record => record.word);

    // Create a regular expression pattern to match whole bad words
    const pattern = new RegExp(`\\b(${words.join('|')})\\b`, 'gi');

    // Replace bad words with asterisks
    const censoredText = text.replace(pattern, '***');

    return censoredText;
  } catch (error) {
    // Handle the error appropriately in your application
    return text; // Return the original text if an error occurs
  }
}

export async function hasBadWord(text:string) {
  try {
    const words = badWords.RECORDS.map(record => record.word);

    // Create a regular expression pattern to match whole bad words
    const pattern = new RegExp(`\\b(${words.join('|')})\\b`, 'gi');

    // Check if the text contains a bad word
    const hasBadWord = pattern.test(text);

    return hasBadWord;
  } catch (error) {
    // Handle the error appropriately in your application
    return false; // Return false if an error occurs
  }
}


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