import axios from 'axios';
// 라우팅은 window.location로 밖에 일단 못하는 거 같음, 훅이라면 axios안에선 사용할 수 없음.
// import { useNavigate } from 'react-router-dom';
// import { router } from '@/routes/index';

const customAxios = axios.create({
  baseURL: `${process.env.REACT_APP_API}/api/member-management`,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
  //  timeout: 1000
});

customAxios.interceptors.request.use(
  function (config) {
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
        .then((response) => {
          console.log(response);
          console.log(1);
          localStorage.setItem('accessToken', response.data.accessToken);
          // window.location.replace('/');
        })
        .catch((error) => {
          console.error(error);
          console.log(2);
          localStorage.setItem('accessToken', '');
          // window.location.replace('/login');
        });
    } else {
      console.log(error);
      console.log(3);
      // localStorage.setItem('accessToken', '');
      // window.location.replace('/login');
    }
  },
);

export { customAxios };
