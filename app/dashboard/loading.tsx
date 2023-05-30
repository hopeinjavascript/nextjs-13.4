import React from 'react';
import { Spinner } from '@/components/bootstrap';

const Loading = () => {
  return (
    <div>
      <Spinner animation="border" /> Loading from Dashboard...
    </div>
  );
};

export default Loading;
