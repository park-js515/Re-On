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

  api.delete(`/sessions/${sessionId}/delete`).then(success).catch(fail);
}

// 2. 배틀룸 세션 생성 // body에 전달할 게 필요?
/**
 *
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function createSession(success, fail) {
  const api = openviduInstance();

  api.post(`/sessions/connections`).then(success).catch(fail);
}

export { destorySession, createSession };
