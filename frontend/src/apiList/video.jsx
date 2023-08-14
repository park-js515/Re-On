import { videoInstance } from './lib/index';

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
/**
 *
 * @param {FormData} formData [{originalVideo: video, thumbnail: img, videoSaveRequest: JSON.stringify({actor: string, script: string, sttScript: string, title: string})}]
 * @param {function} success [calllback]
 * @param {function} fail [callback]
 */
function saveVideo(formData, success, fail) {
  const api = videoInstance();
  api.defaults.headers['Content-Type'] = 'multipart/form-data';

  api.post(`/video`, formData).then(success).catch(fail);
}

export {randomVideo, saveVideo}