import { useState } from 'react';
import axios from 'axios';

import axiosInstance, { APIError, APIErrorResponse } from './api';


// eslint-disable-next-line function-paren-newline
export default function useApiCall<ResType, PayloadType = void>(
  method: string,
  endpoint: string,
  parameters?: Record<string, string>,
) {
  const [apiResponse, setApiResponse] = useState<ResType>(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState<Array<APIError>>(null);
  const makeCall = async (data?: PayloadType) => {
    setApiResponse(null);
    setApiLoading(false);
    setApiError(null);
    try {
      const res = await axiosInstance<ResType>({
        method,
        url: endpoint,
        data,
        params: parameters,
      });
      setApiResponse(res.data);
    } catch (e) {
      if (axios.isAxiosError<APIErrorResponse>(e) && e.response) {
        setApiError(e.response.data.error);
      } else {
        setApiError([
          {
            detail: `Exception: ${String(e.message)}`,
            // jsException needs to be a string with a truthy value
            jsException: 'true',
          },
        ]);
      }
    } finally {
      setApiLoading(false);
    }
  };
  return [makeCall, apiResponse, apiLoading, apiError] as const;
}
