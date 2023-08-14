import { videoInstance } from "./lib/index";

// 1. video 중 랜덤 1개를 선택하여 조회
/**
 * 
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function randomVideo(success, fail) {
  const api = videoInstance();

  api.get(`/video`).then(success).catch(fail);
}

// 2. video를 저장
function saveVideo(success, fail) {
  const api = videoInstance();

  api.post(``);
}