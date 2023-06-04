export async function sleep(seconds: number) {
  return await new Promise((resolve, reject) =>
    setTimeout(resolve, seconds * 1000)
  );
}

export async function callApi(URL: string) {
  const res = await fetch(URL);
  return await res.json();
}

export function getRandomNumber() {
  let randomNum = Math.floor(Math.random() * 10);
  return randomNum ? randomNum : 20;
}
