export async function sleep(seconds: number) {
  return await new Promise((resolve, reject) =>
    setTimeout(resolve, seconds * 1000)
  );
}
