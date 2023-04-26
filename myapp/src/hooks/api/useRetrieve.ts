import { useEffect } from 'react';

import useApiCall from './useApiCall';


function useRetrieve<T>(endpoint: string, parameters?: Record<string, string>) {
  // eslint-disable-next-line function-paren-newline
  const [makeCall, data, loading, errors] = useApiCall<T>(
    'GET', endpoint, parameters);
  useEffect(
    () => {
      makeCall();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [endpoint, JSON.stringify(parameters), makeCall],
  );
  return [data, loading, errors] as const;
}

export default useRetrieve;
