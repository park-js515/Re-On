import createCustomAxios from "./createCustomAxios";

function authInstance() {
  const instance = createCustomAxios('/api/auth');

  return instance;
}

function memberInstance() {
  const instance = createCustomAxios('/api/member-management');

  return instance;
}

function openviduInstance() {
  const instance = createCustomAxios('/api/openvidu-management');

  return instance;
}

function postInstance() {
  const instance = createCustomAxios('/api/post-management');

  return instance;
}

export { authInstance, memberInstance, openviduInstance, postInstance };
