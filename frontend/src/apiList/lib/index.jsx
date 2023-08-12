// import axios from "axios"
import createCustomAxios from "./createCustomAxios";
// const networktarget = process.env.REACT_APP_API;

// function getAccessToken() {
//   return localStorage.getItem('accessToken');
// }

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
  const instance = createCustomAxios('/api/post-management/post');

  return instance;
}

export { authInstance, memberInstance, openviduInstance, postInstance };
