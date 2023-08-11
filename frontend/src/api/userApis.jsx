import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const customAxios = axios.create({
  baseUrl: process.env.REACT_APP_API,
  //  timeout: 1000
});

customAxios.interceptors.request.use(
  function (config) {
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
    config.headers['Authorization'] = `Bearer ${localStorage.getItem(
      'accessToken',
    )}`;

    return config;
  },

  function (error) {
    return Promise.reject(error);
  },
);

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      error.config.headers = {
        'Content-Type': 'application/json',
        Authentication: `Bearer ${localStorage.getItem('accessToken')}`,
      };

      axios
        .request(error.config)
        .then((response) =>
          localStorage.setItem('accessToken', response.data.accessToken),
        )
        .catch((error) => {
          console.error(error);
          localStorage.setItem('accessToken', '');
          const navigate = useNavigate();
          navigate('/login');
        });
    } else {
      localStorage.setItem('accessToken', '');
      const navigate = useNavigate();
      navigate('/login');
    }
  },
);
