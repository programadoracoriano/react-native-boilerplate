import { applyAuthTokenInterceptor } from 'react-native-axios-jwt';
import axios from 'axios';
import Constants from 'expo-constants';


const BASE_URL = `${Constants.expoConfig.extra?.API_URL}`;

const axiosInstance = axios.create({ baseURL: BASE_URL });

export interface APIError {
  detail: string;
  [key: string]: string;
}

export type APIErrorResponse = {
  error: Array<APIError>;
};

type RefreshResponse = {
  access: string;
  refresh: string;
};

const requestRefresh = async (refreshToken: string) => {
  const response = await axios.post<RefreshResponse>(
    `${BASE_URL}/users/login/refresh/`,
    { refresh: refreshToken },
  );
  return response.data.access;
};

applyAuthTokenInterceptor(axiosInstance, { requestRefresh });

export default axiosInstance;
