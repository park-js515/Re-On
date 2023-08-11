import { memberInstance } from './lib/index';

// 1. Back stage member 조회
/**
 * 
 * @param {number} memberId
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function searchBackStageMembmerInfo(memberId, success, fail) {
  const api = memberInstance();

  api.get(`/back-stage/${memberId}`).then(success).catch(fail);
}

// 2. Battle 기록 조회
/**
 * 
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function searchBattleLog(success, fail) {
  const api = memberInstance();

  api.get('/battlelog').then(success).catch(fail);
}

// 3. Battle 결과 등록
/**
 * 
 * @param {object} body [{result: number, user1Id: number, user2Id: number, videoId: number}]
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function registerBattleLog(success, fail) {
  const api = memberInstance();

  api.post('/battlelog').then(success).then(fail);
}

// 4. member profile image 삭제
/**
 * 
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function deleteMemberImg(success, fail) {
  const api = memberInstance();

  api.delete('/images/delete').then(success).catch(fail);
}

// 5. member profile image 수정
/**
 * 
 * @param {formData} profileImg
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function updateMemberImg(profileImg, success, fail) {
  const api = memberInstance();

  api
    .put('/images/update', JSON.stringify(profileImg))
    .then(success)
    .catch(fail);
}

// 6. mypage member 조회
/**
 * 
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function searchMypageMember(success, fail) {
  const api = memberInstance();

  api.put(`/member`).then(success).catch(fail);
}

// 7. 회원탈퇴
/**
 *
 * @param {number} memberId
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function deleteMember(memberId, success, fail) {
  const api = memberInstance();

  api.delete(`/member/${memberId}`).then(success).catch(fail);
}

// 8. member 배틀 정보 조회
/**
 *
 * @param {number} memberId
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function searchMemberInfo(memberId, success, fail) {
  const api = memberInstance();

  api.get(`/member/${memberId}/battleInfo`).then(success).catch(fail);
}

// 9. 로그아웃
/**
 *
 * @param {number} memberId
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function logoutMember(memberId, success, fail) {
  const api = memberInstance();

  api.get(`/member/logout/${memberId}`).then(success).catch(fail);
}

// 10.
/**
 *
 * @param {object} data [{memberId: number, introduce: string, nickName: string}]
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function updateMember(data, success, fail) {
  const api = memberInstance();

  api.get(`/member/update`, JSON.stringify(data)).then(success).catch(fail);
}
export {
  searchBackStageMembmerInfo,
  searchBattleLog,
  registerBattleLog,
  deleteMemberImg,
  updateMemberImg,
  searchMypageMember,
  deleteMember,
  searchMemberInfo,
  logoutMember,
  updateMember,
};
