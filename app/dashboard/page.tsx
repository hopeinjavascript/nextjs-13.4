import { sleep } from '@/utils';

export const metadata = {
  title: 'Dashboard',
};

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default async function Page() {
  await sleep(1); // kept to see loading indicator from loading.tsx file
  // throw new Error('Error from error.tsx page!'); // uncomment this to see error.tsx content
  return <h1>Hello, Dashboard Page!</h1>;
}
