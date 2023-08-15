import axios from 'axios';
import Swal from 'sweetalert2';
import 'components/login/styles.css';
// 라우팅은 window.location로 밖에 일단 못하는 거 같음, 훅이라면 axios안에선 사용할 수 없음.
// import { useNavigate } from 'react-router-dom';
// import { router } from '@/routes/index';

let isAlertDisplayed = false;

const clearLocalStorage = () => {
  localStorage.clear();
};

const logoutRedirect = () => {
  window.location.replace('/logout');
};

const createCustomAxios = (URL) => {
  const customAxios = axios.create({
    baseURL: `${process.env.REACT_APP_API}${URL}`,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
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
      if (error.response.status === 401 || error.response.status === 403) {
        if (!isAlertDisplayed) {
          isAlertDisplayed = true;

          Swal.fire({
            icon: 'error',
            title: '세션 만료',
            text: '세션이 만료되어 로그아웃됩니다.',
            customClass: {
              container: 'custom-swal-container',
            },
            willClose: () => {
              clearLocalStorage();
              logoutRedirect();
            }
          });
        }
      } else {
        return error;
      }
    },
  );

  return customAxios;
};

export default createCustomAxios;
