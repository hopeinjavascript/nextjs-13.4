'use client';

// We are doing this because as of yet App router is relatively a new feature so not all React Component Libraries have adapted to it.
// SO we export our own component using "use client" directive thereby making them Client components
// this is possible because a parent component declared to be using "use client" directive then all of its children components automatically are
// considered to be Client components
// * Once the App Router is more stable/old then we just have to remove this wrapper component and everything should work just fine
export { Container, SSRProvider, Alert, Spinner } from 'react-bootstrap';
