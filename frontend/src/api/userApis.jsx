import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userAcessToken } from 'redux/userSlice';
import { useNavigate } from 'react-router-dom';

// 요청을 보낼 때마다 가장 먼저 실행될 함수
// 사용자의 accessToken을 back으로 보내 유효한 토큰인지 확인하고
// 처리해야할 로직을 미리 정한다.

// const AxiosInterceptor = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user);
// };

const defaultApi = axios.create({
  baseURL: process.env.REACT_APP_API + `/something/else`,
});

defaultApi.interceptors.request.use({
  function(config) {
    const accessToken = userAcessToken();

    if (accessToken) {
      config.headers['Authorization'] = `Bearer` + accessToken;
    }

    return config;
  },

  async function(error) {
    return Promise.reject(error);
  },
});

defaultApi.interceptors.response.use({
  function(response) {
    return response;
  },

  async function(error) {
    const { response: errorResponse } = error;
    // const errorResponse = error.response;
    const originalRequest = error.config;

    // AT만 만료 (임시로 401)
    // 아니면 401에러를 받고, 그에 대한 데이터로 분화한다.
    if (errorResponse.status === 401) {
      return;
    }
    // AT, RT 만료 (임시로 403)
    else if (errorResponse.status === 403) {
      return;
    }
    // 기타 모든 것
    else {
      return;
    }
  },
});
