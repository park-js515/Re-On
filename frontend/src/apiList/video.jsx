import { videoInstance } from './lib/index';

// 1. 영상 랜덤 조회
/**
 *
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function searchRandomVideo(success, fail) {
  const api = videoInstance();
  api.get('/video').then(success).catch(fail);
}

export { searchRandomVideo };
