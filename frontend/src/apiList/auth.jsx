import { authInstance } from './lib/index';

/**
 * 
 * @param {object} body [{authorizationCode: string, state: string}]
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function getNaverToken(body, success, fail) {
  const api = authInstance();
  api.post(`/naver`, JSON.stringify(body)).then(success).catch(fail);
}

export { getNaverToken };
