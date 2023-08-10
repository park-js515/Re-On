import { memberInstance } from './lib/index';

function searchBackStageMembmerInfo(memberId, success, fail) {
  const api = memberInstance();

  api.get(`/back-stage/${memberId}`).then(success).catch(fail);
}

function searchBattleInfo(params, success, fail) {
  const api = memberInstance();
  
  api.get()
} // 보류 확인 불가

function updateBattleInfo(battleInfo, success, fail) {
  const api = memberInstance();
  api.get(`/battleInfo/update`, JSON.stringify(battleInfo))
}

function searchBattleLog(params, success, fail) {
  const api = memberInstance();
}

function registerBattleLog(params, success, fail) {
  const api = memberInstance();
}

function deleteMemberImg(params, success, fail) {
  const api = memberInstance();
}

function updateMemberImg(params, success, fail) {
  const api = memberInstance();
}

function searchMyPageMemberInfo(params, success, fail) {
  const api = memberInstance();
}

function deleteMember(params, success, fail) {
  const api = memberInstance();
}

function logoutMember(params, success, fail) {
  const api = memberInstance();
}

function updateMember(params, success, fail) {
  const api = memberInstance();
}
