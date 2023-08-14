import createCustomAxios from "./createCustomAxios";

function authInstance() {
  let accessToken = getAccessToken();
  const instance = axios.create({
    baseURL: networktarget + '/api/auth',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return instance;
}

function memberInstance() {
  let accessToken = getAccessToken();
  const instance = axios.create({
    baseURL: networktarget + '/api/member-management',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return instance;
}

function openviduInstance() {
  let accessToken = getAccessToken();
  const instance = axios.create({
    baseURL: networktarget + '/api/openvidu-management',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return instance;
}

function postInstance() {
  const instance = createCustomAxios('/api/post-management');

  return instance;
}

export { authInstance, memberInstance, openviduInstance, postInstance };
