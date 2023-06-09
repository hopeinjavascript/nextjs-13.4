'use client';

import { callApi } from '@/utils';
import Image from 'next/image';
import React, { useState, useRef, FormEvent } from 'react';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';

import styles from './search.module.css';

type TImage = {
  id: number;
  title: string;
  url: string;
};

const Search = () => {
  const [data, setData] = useState<TImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //   const refInput = useRef();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    // key inside get() corresponds to the "name" in Form.Control
    const query = formData.get('query')?.toString().trim();
    console.log({ query });
    if (!query) return alert('please input a value');

    // suppose we want to query an api in which we should pass our access key to authenticate ourself to that api
    // NOTE: you can access only those envs on client side which are preceded by NEXT_PUBLIC, if they are not preceded by NEXT_PUBLIC then accessing it in the client side will return undefined
    // this certainly can be done from client side but your key will get exposed if someone inspects your page
    // so the way out is to setup our own backend route and make a fetch call to our api route which will in turn make a call to the actual api.

    const controller = new AbortController();
    const signal = controller.signal;

    try {
      setLoading(true);
      const images = await callApi(`/api/search?albumId=${query}`, {
        signal,
      });
      console.log({ images });
      setData(images);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
      controller.abort();
      //   refInput.current.focus();
    }
  };

  return (
    <div>
      <Alert>
        This page fetches data <strong>client-side</strong>. In order to not
        leak API credentials, the request is sent to a NextJS{' '}
        <strong>route handler</strong> that runs on the server. This route
        handler then fetches the data from the <strong>actual</strong> API and
        returns it to the client.
      </Alert>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="search-input">
          <Form.Label>Search query</Form.Label>
          <Form.Control
            name="query"
            placeholder="Search for a number between 1 to 100. Default is 1"
            // ref={refInput}
          />
        </Form.Group>
        <Button type="submit" className="mb-3" disabled={loading}>
          Search
        </Button>
      </Form>

      <div className="d-flex flex-column align-items-center">
        {loading && <Spinner animation="border" />}
        {error && <p>Something went wrong. Please try again.</p>}
      </div>

      <div className="d-flex justify-between flex-wrap">
        {data && (
          <>
            {data.map((image) => (
              <Image
                key={image.id}
                src={image.url}
                width={200}
                height={200}
                alt={image.title}
                className={`rounded shadow mw-100 h-100 ${styles.img}`}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
