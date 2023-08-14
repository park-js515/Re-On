import { memberInstance } from './lib/index';

// 1. 회원 탈퇴
/**
 *
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function searchBackStageMembmerInfo(success, fail) {
  const api = memberInstance();

  api.delete(`/member`).then(success).catch(fail);
}

// 2. mypage member 조회
/**
 *
 * @param {string} email
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
async function searchMypageMemberInfo(email, success, fail) {
  const api = memberInstance();
  await api.get(`/member/${email}`).then(success).catch(fail);
}

// 3. Back stage member 조회
/**
 *
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function deleteMember(success, fail) {
  const api = memberInstance();

  api.get(`/member/back-stage`).then(success).catch(fail);
}

// 4. Battle 기록 조회
/**
 *
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function searchBattleLog(success, fail) {
  const api = memberInstance();
  api.get('/member/battlelog').then(success).catch(fail);
}

// 5. Battle 결과 등록
/**
 *
 * @param {object} body [{opponentEmail: string, result: number, videoId: number}]
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function registerBattleLog(body, success, fail) {
  const api = memberInstance();

  api.post('/member/battlelog', JSON.stringify(body)).then(success).then(fail);
}

// 6. Battle top 5 조회
/**
 *
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */

function searchTop5Member(success, fail) {
  const api = memberInstance();
  api.get(`/member/battlelog/rank`).then(success).catch(fail);
}

// 7. member profile image 삭제
/**
 *
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */

function deleteMemberImg(success, fail) {
  const api = memberInstance();

  api.delete('/member/image/delete').then(success).catch(fail);
}

// 8. member profile image 수정
/**
 *
 * @param {formData} profileImg
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function updateMemberImg(profileImg, success, fail) {
  const api = memberInstance();
  api.defaults.headers['Content-Type'] = 'multipart/form-data';

  api.put('/member/image/update', profileImg).then(success).catch(fail);
}

// 9. 로그아웃
/**
 *
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function logoutMember(success, fail) {
  const api = memberInstance();

  api.get(`/member/logout`).then(success).catch(fail);
}

// 10. member 정보 수정
/**
 *
 * @param {object} body [{introduce: string, nickName: string}]
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function updateMemberInfo(body, success, fail) {
  const api = memberInstance();

  api.put(`/member/update`, JSON.stringify(body)).then(success).catch(fail);
}

export {
  searchBackStageMembmerInfo,
  searchMypageMemberInfo,
  deleteMember,
  searchBattleLog,
  registerBattleLog,
  searchTop5Member,
  deleteMemberImg,
  updateMemberImg,
  logoutMember,
  updateMemberInfo,
};
