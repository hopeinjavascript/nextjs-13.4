import { sleep } from '@/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home page',
  description: 'Home page for Jot down',
};

// we can turn this into an async function because by default all components inside app (App Router) directory is a server component
export default async function Home() {
  await sleep(1); // kept to see loading indicator from loading.tsx file
  // throw new Error('Error from Counter component'); // uncomment this to see error.tsx content
  return (
    <div className="h-screen flex justify-center items-center">
      <h1>Hello, Home page!</h1>
    </div>
  );
}
