import { notFound } from 'next/navigation';
import { cache } from 'react';

export async function sleep(seconds: number) {
  return await new Promise((resolve, reject) =>
    setTimeout(resolve, seconds * 1000)
  );
}

export async function callApi(URL: string) {
  const res = await fetch(URL);

  // to redirect to our custom not found page instead of showing blank result when th
  // underlying/upstream api doesn't return any result
  if (!res.ok) {
    notFound();
  }

  return await res.json();
}

// in case if you are using any other data fetching library apart from native fetch
export const cachedCallApi = cache(callApi);

export function getRandomNumber() {
  let randomNum = Math.floor(Math.random() * 10);
  return randomNum ? randomNum : 20;
}
