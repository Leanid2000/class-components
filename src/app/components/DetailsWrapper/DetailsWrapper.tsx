import { Suspense } from 'react';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';

export default function DetailsWrapper({
  id,
  page,
}: {
  id: string;
  page: string;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailsContainer id={id} page={page} />
    </Suspense>
  );
}
