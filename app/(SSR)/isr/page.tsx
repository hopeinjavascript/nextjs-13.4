import Image from 'next/image';
import { Alert } from '@/components/bootstrap';

type TImage = {
  id: number;
  title: string;
  url: string;
};

export const metadata = {
  title: 'Incremental Static Regeneration',
};

// Incremental Static Regeneration (ISR) lets you cache the page for a certain time interval
// Lets say you set 15s, then the page will show the same result until 15s are expired and after that the resources will be re-fetched to get the updated result
// when we refresh the page after 15s we will see the same/previous image but next js goes ahead and re-fetches and rerenders the page with new result
// meaning only the second refresh will give us the new result
// same page is shown to all the users, until one user triggers a revalidation of the result after 15s

// Equivalent to ISR
// ! not working in DEV node for some reason but works in PROD mode
// export const revalidate = 15;

export default async function Page() {
  let randomNum = Math.floor(Math.random() * 10);
  randomNum = randomNum ? randomNum : 20; // check for randomNum zero, below api doesn't have resource for 0 number
  const URL = `https://jsonplaceholder.typicode.com/photos/${randomNum}`;
  const res = await fetch(URL, {
    next: { revalidate: 15 },
  });
  const image: TImage = await res.json();

  return (
    <div className="flex flex-col justify-center items-center">
      <Alert>
        This page uses <strong>incremental static regeneration</strong>. A new
        image is fetched every 15 seconds (after refreshing the page) and then
        served from the cache for that duration.
      </Alert>

      <Image
        src={image.url}
        width={400}
        height={400}
        alt={image.title}
        className="rounded shadow mw-100 h-100"
      />
      <a href={URL}>actual image</a>
    </div>
  );
}
