import Image from 'next/image';
import { Alert } from '@/components/bootstrap';
import { sleep } from '@/utils';
import Link from 'next/link';

/*
building project(PROD mode) makes sure that the content is cached and served instantly

Any asynchronous code will be not be executed every time we refresh/hard-refresh the page, this is equivalent of getStaticProps in "pages" directory

In App Router, this functionality is achieved without any special configuration/exporting of getStaticProps function

Image ('next/image')-
it forces you to set fixed width and height so that it knows the dimensions in advance to prevent there is no UI shift
this enhances UX and saves load time by not loading the large image unnecessarily
    - it can happen when you try to click a button the UI shift leading to bad UX
    - it is not good for SEO (Google punishes you for this behaviour)
*/

type TImage = {
  id: number;
  title: string;
  url: string;
};

export const metadata = {
  title: 'Static Rendering',
  //   description: ''
};

export default async function Page() {
  //   const URL = 'https://jsonplaceholder.typicode.com/photos/1';
  // const URL = `https://unsplash.it/500/${500 + Math.floor(Math.random() * 10)}`;
  //   const res = await fetch(URL);
  //   const image: TImage = await res.json();

  let randomNum = Math.floor(Math.random() * 10);
  randomNum = randomNum ? randomNum : 20; // check for randomNum zero, below api doesn't have resource for 0 number
  const URL = `https://jsonplaceholder.typicode.com/photos/${1}`;
  // const URL = `https://unsplash.it/500/${500 + Math.floor(Math.random() * 10)}`;
  const res = await fetch(URL);
  const image: TImage = await res.json();
  // console.log({ randomNum });
  // console.log(image);

  return (
    <div className="flex flex-col justify-center items-center">
      <Alert>
        This page <strong>fetches and caches data at build time</strong>. Even
        though the Unsplash API always returns a new image, we see the same
        image after refreshing the page until we compile the project again.
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
