import React from 'react';
import { useParams } from 'react-router-dom';
import StreamDetail from './StreamDetail';
import DiplomaStreamDetail from './DiplomaStreamDetail';
import ScienceStreamDetail from './ScienceStreamDetail';

const StreamDetailWrapper: React.FC = () => {
  const { pathwaySlug, streamSlug } = useParams<{ pathwaySlug: string, streamSlug: string }>();

  if (pathwaySlug === 'diploma') {
    return <DiplomaStreamDetail />;
  }

  if (streamSlug === 'science') {
    return <ScienceStreamDetail />;
  }

  return <StreamDetail />;
};

export default StreamDetailWrapper;
