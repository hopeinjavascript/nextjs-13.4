import Image from 'next/image';
import { Alert } from '@/components/bootstrap';

type TImage = {
  id: number;
  title: string;
  url: string;
};

export const metadata = {
  title: 'Dynamic Rendering',
};

/**
 * (1.) check out the pre-fetch feature of next JS, hover the link and check the console you will see the logs (server or your own)...
 * (2.) on hover, the resource(s) are already (pre)fetched and when you visit the page upon clicking the respective link the contents are immediately shown and the logs won't move forward as they already did (pt. 1) when we hovered the link before clicking
 * Side Note: Also, this naturally happens when we want to click an element (ex. link) on the page, it is hovered prior to the user action (ex. clicking)
 * */

/*
with diff ways of revalidating we can have fine control over fetch calls
Ex. we can have one fetch call with no-cache and another one can be cached if need be

  > export const revalidate = 0;  // this is at the page-level, will affect all the fetch calls in the page
  > cache: 'no-cache', // OR // "no-store" // fine control over each fetch
  > next: { revalidate: 0 }, // just another Next JS's way of revalidating. Side note: Next JS extends fetch API and add its own functionalities or properties or options or features
  */

// Equivalent to getServerSideProps
export const revalidate = 0;

export default async function Page() {
  let randomNum = Math.floor(Math.random() * 10);
  randomNum = randomNum ? randomNum : 20; // check for randomNum zero, below api doesn't have resource for 0 number
  const URL = `https://jsonplaceholder.typicode.com/photos/${randomNum}`;
  const res = await fetch(URL, {
    // cache: 'no-cache',
    // next: { revalidate: 0 },
  });
  const image: TImage = await res.json();

  return (
    <div className="flex flex-col justify-center items-center">
      <Alert>
        This page <strong>fetches data dynamically</strong>. Every time you
        refresh the page, you get a new image from the Unsplash API.
      </Alert>

      {/* 
        Unlike DEV mode, in PROD (npm run build), this will show the same image no matter what, as the component is built and fetch the resources at compile time
        and the static HTML is rendered everything the page is refreshed or even hard refreshed
         */}
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
