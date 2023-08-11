import axios from 'axios';

// const networktarget = "https://i9c203.p.ssafy.io";
const networktarget = "https://localhost:8080";

function getAccessToken() {
    return localStorage.getItem("accessToken");
}

function testInstance() {
    let accessToken = getAccessToken();
    const instance = axios.create({
        baseURL: networktarget + "/api/auth",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Authorization": `Bearer ${accessToken}`,
        },
    });
    return instance;
}
export { testInstance };