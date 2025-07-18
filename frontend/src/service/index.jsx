import axios from 'axios';

var bearerToken = '';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  validateStatus: (status) => {
    if (status === 401) {
      localStorage.clear();
      window.location.href = '/';
      return false;
    } else {
      return true;
    }
  },
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor
// Step-2: Create request, response & error handlers
const requestHandler = (request) => {
  const token = localStorage.getItem("token");

  if (token) {
    bearerToken = `Bearer ${token}`;
  }
  request.headers.Authorization = bearerToken;
  return request;
};

const responseHandler = (response) => {
  return response;
};

const errorHandler = (error) => {
  console.log('error', error.response.status === 401);

  if (error.message === 'Network Error') {
    return;
  } else if (error.response.status === 401) {
          localStorage.clear();
    window.location.href = '/auth';
    return;
  } else if (error.response.data.status === 404) {
    return Promise.reject(error);
  } else {
    return Promise.reject(error);
  }
};
api.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

api.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default api;
