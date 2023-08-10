import { openviduInstance } from './lib/index';

// 1. 배틀룸 세션 종료
/**
 *
 * @param {string} sessionId
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function destorySession(sessionId, success, fail) {
  const api = openviduInstance();

  api.delete(`/session/${sessionId}/delete`).then(success).catch(fail);
}

// 2. 배틀룸 세션 생성
/**
 *
 * @param {function} success
 * @param {function} fail
 */
function createSession(success, fail) {
  const api = openviduInstance();

  api.post(`/session/connections`).then(success).catch(fail);
}

export { destorySession, createSession };
