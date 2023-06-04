import { cachedCallApi, callApi } from '@/utils';
import { Metadata } from 'next';
import { Alert } from '@/components/bootstrap';

/**
 * there are two API calls for getting the same data
 *  - one in main page function
 *  - one in generateMetadata function
 * Next JS de-dupes these api calls if it encounters more than once
 * meaning the api will be called only one time in the page/application, no matter how many times you call it
 * Note: This dedupe functionality is only available for native fetch call
 *       if you happen to use any other library for data fetching then you will have to use the "cache" function
 *       from "react" to take advantage of de-duping api calls
 *       ex. cache(< fn_to_cache >)
 */

type TParams = {
  params: { user: string };
};

type TUser = {
  id: number;
  name: string;
  username: string;
  email: string;
};

// dynamically set metadata based on the response received from API
export async function generateMetadata({
  params: { user },
}: TParams): Promise<Metadata> {
  const URL = `https://jsonplaceholder.typicode.com/users/${user}`;
  const userObj: TUser = await cachedCallApi(URL); // just demonstrating cache call
  return {
    title: userObj.name,
  };
}

export default async function UserPage({ params: { user } }: TParams) {
  const URL = `https://jsonplaceholder.typicode.com/users/${user}`;
  const userObj: TUser = await callApi(URL);

  return (
    <div>
      <Alert>
        This profile page uses <strong>generateMetadata</strong> to set the{' '}
        <strong>page title</strong> dynamically from the API response.
      </Alert>

      <p>
        id:{' '}
        <strong>
          <em>{userObj.id}</em>
        </strong>
      </p>
      <p>
        name:{' '}
        <strong>
          <em>{userObj.email}</em>
        </strong>
      </p>
      <p>
        email:{' '}
        <strong>
          <em>{userObj.name}</em>
        </strong>
      </p>
    </div>
  );
}
