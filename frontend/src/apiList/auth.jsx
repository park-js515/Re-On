import { authInstance } from './lib/index';

function getNaverToken(code, success, fail) {
  const api = authInstance();
  api.post(`/naver`, JSON.stringify(code)).then(success).catch(fail);
}

export { getNaverToken };
