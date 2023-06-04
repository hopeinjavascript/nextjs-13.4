import Image from 'next/image';
import { Alert } from '@/components/bootstrap';
import { callApi, getRandomNumber } from '@/utils';
import { Metadata } from 'next';
import styles from './albums.module.css';

// you have to name it params / searchParams
type TParams = {
  params: { album: string }; // route params/path
  // searchParams: { [key: string]: string | string[] | undefined }, // query params/string
};

type TImage = {
  id: number;
  title: string;
  url: string;
};

// below flag can be used to disable params(dynamic) other than the ones defined in the generateStaticParams()
// it will show not found page
// export const dynamicParams = false;

// for caching
export const revalidate = 10;

// below function is use to set the metadata dynamically
// it takes the same params as that of the default page function
export function generateMetadata({ params: { album } }: TParams): Metadata {
  return {
    title: `Album Id ${album}`,
  };
}

/*
  >> generateStaticParams
    - to fetch the results in advance when we compile/build the project and NOT when the user accesses it
    - this function should return array of params objects
      ex. in our case the params is "album" so we will return
          [{album: "health"}, {album: "coding"}, {album: "music"}, {album: "holidays"}]
  */
export function generateStaticParams() {
  // these results should load without loading indicator
  // these can be seen in the build logs
  // if any other keyword is searched other than the below ones then they will be fetched when user accesses the resource
  return ['1', '5', '22'].map((album) => ({ album }));
}

export default async function AlbumPage({ params: { album } }: TParams) {
  const URL = `https://jsonplaceholder.typicode.com/photos?albumId=${getRandomNumber()}`;
  const images: TImage[] = await callApi(URL);

  return (
    <div>
      <Alert>
        This page uses <strong>generateStaticParams</strong> to capture the
        route params to render and cache static pages at build time, even though
        the URL has a dynamic parameter. Pages that are not included in
        generateStaticParams will be fetched & rendered when user first accesses
        it and are then <strong>cached for subsequent requests</strong> (this
        can be disabled by exporting the flag dynamicParams = false).
      </Alert>
      <h1>Album Id {album}</h1>

      <div className="d-flex justify-between flex-wrap">
        {images.map((image) => (
          <Image
            key={image.id}
            src={image.url}
            width={200}
            height={200}
            alt={image.title}
            className={`rounded shadow mw-100 h-100 ${styles.img}`}
          />
        ))}
      </div>
    </div>
  );
}
