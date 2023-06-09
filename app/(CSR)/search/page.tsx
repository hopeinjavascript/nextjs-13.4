import { Metadata } from 'next';

import Search from './Search';

// you cannot export metadata from a client component
// if you intend to do this then you will have to make it a server component
// if you want to use states and effects then you can import a client component and use it in this server component
// Basically, you cannot use server-side features (metadata) and client-side features (useState) together.
export const metadata: Metadata = {
  title: 'Search',
  description: 'Search functionality',
};

// you can even fetch data in this server component and pass it down to the client component
export default function Page() {
  return (
    <div>
      <Search />
    </div>
  );
}
