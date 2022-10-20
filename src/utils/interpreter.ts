import { AxiosResponse } from "axios";
export const ResponseInterpreter = (response: AxiosResponse) => {
  return response.data;
};

export interface RiotAPIError {
  request: {
    method: string;
    path: string;
    header: string;
    url: string;
  };
  status_code: number;
  message: string;
}

export const ErrorInterpreter = (error: any): Promise<RiotAPIError> => {
  const { method, path, _header, res } = error.request;
  switch (error.response.status) {
    case 400:
    case 401:
    case 403:
    case 404:
    case 405:
    case 415:
    case 429:
    case 500:
    case 502:
    case 503:
    case 504:
      return Promise.reject({
        request: {
          method,
          path,
          header: _header,
          url: res.responseUrl,
        },
        status_code: error.response.status,
        message: error.response.data.status.message,
      });
    default:
      return Promise.reject({
        request: {
          method,
          path,
          header: _header,
          url: res.responseUrl,
        },
        status_code: error.response.status,
        message: error.response?.data?.status?.message || "Unknown Error",
      });
  }
};
