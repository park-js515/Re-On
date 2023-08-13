import { postInstance } from './lib/index';

// 1. post 저장
/**
 *
 * @param {number} videoId
 * @param {formData} actionVideo
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function savePost(videoId, actionVideo, success, fail) {
  const api = postInstance();

  api
    .post(`?videoId=${videoId}`, JSON.stringify(actionVideo))
    .then(success)
    .catch(fail);
}

// 2. post 수정
/**
 *
 * @param {number} postId
 * @param {object} body [{content: string, title: string}]
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function updatePost(postId, body, success, fail) {
  const api = postInstance();

  api.put(`/${postId}`, JSON.stringify(body)).then(success).catch(fail);
}

// 3. Detail post에서 댓글 10개를 조회한다.
/**
 *
 * @param {number} postId
 * @param {number} offset
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function searchPostDetailComment(postId, offset, success, fail) {
  const api = postInstance();

  api.get(`/${postId}/comment?offset=${offset}`).then(success).catch(fail);
}

// 4. post 댓글 작성
/**
 *
 * @param {number} postId
 * @param {object} body [{content: string}]
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function createPostComment(postId, body, success, fail) {
  const api = postInstance();

  api
    .post(`/${postId}/comment`, JSON.stringify(body))
    .then(success)
    .catch(fail);
}

// 5. post 댓글 업데이트
/**
 *
 * @param {number} commentId
 * @param {object} body [{content: string}]
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function updatePostComment(commentId, body, success, fail) {
  const api = postInstance();

  api
    .put(`/comment/${commentId}`, JSON.stringify(body))
    .then(success)
    .catch(fail);
}

// 6. post 댓글 삭제
/**
 *
 * @param {number} commentId
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function deletePostComment(commentId, success, fail) {
  const api = postInstance();

  api.delete(`/comment/${commentId}`).then(success).catch(fail);
}

// 7. post 삭제 (swagger에 put으로 되어있는 듯)
/**
 *
 * @param {number} postId
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function deletePost(postId, success, fail) {
  const api = postInstance();

  api.delete(`/delete/${postId}`).then(success).catch(fail);
}

// 8. 투표해줘 public post 목록 전체 조회
/**
 *
 * @param {number} offset
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function searchAllPublicPost(offset, success, fail) {
  const api = postInstance();

  api.get(`/feed?offset=${offset}`).then(success).catch(fail);
}

// 9. 투표해줘 페이지 TOP10 post 조회
/**
 *
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function searchTop10Post(success, fail) {
  const api = postInstance();

  api.get('/feed/rank').then(success).catch(fail);
}

// 10. post 좋아요
/**
 *
 * @param {number} postId
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function likePost(postId, success, fail) {
  const api = postInstance();

  api.post(`/like/${postId}`).then(success).catch(fail);
}

// 11. mypage 내가 좋아요 누른 post 목록 조회
/**
 *
 * @param {number} offset
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function searchLikePost(offset, success, fail) {
  const api = postInstance();

  api.get(`/liked?offset=${offset}`).then(success).catch(fail);
}

// 12. mypage private post 목록 조회
/**
 *
 * @param {number} offset
 * @param {function} success
 * @param {function} fail
 */
function searchPrivatePost(offset, success, fail) {
  const api = postInstance();

  api.get(`/private?offset=${offset}`).then(success).catch(fail);
}

// 13. private post 상세 조회
/**
 *
 * @param {number} postId
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function searchPrivatePostDetail(postId, success, fail) {
  const api = postInstance();

  api.get(`/private/${postId}`).then(success).catch(fail);
}

// 14. private to public post
/**
 *
 * @param {number} postId
 * @param {object} body [{content: string, title: string}]
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function uploadPrivatePost(postId, body, success, fail) {
  const api = postInstance();

  api.put(`/private/${postId}`, JSON.stringify(body)).then(success).catch(fail);
}

// 15. mypage public post 목록 조회
/**
 *
 * @param {number} offset
 * @param {number} memberId
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function searchPublicPost(offset, memberId, success, fail) {
  const api = postInstance();

  api
    .get(`/public?offset=${offset}&memberId=${memberId}`)
    .then(success)
    .catch(fail);
}

// 16. public post 상세 조회
/**
 *
 * @param {number} postId
 * @param {function} success [callback]
 * @param {function} fail [callback]
 */
function searchPublicPostDetail(postId, success, fail) {
  const api = postInstance();

  api.get(`/public/${postId}`).then(success).catch(fail);
}

// 17. public to private post
/**
 *
 * @param {number} postId
 * @param {function} success
 * @param {function} fail
 */
function pullDownPublicPost(postId, success, fail) {
  const api = postInstance();

  api.put(`/public/${postId}`).then(success).catch(fail);
}

export {
  savePost,
  updatePost,
  searchPostDetailComment,
  createPostComment,
  updatePostComment,
  deletePostComment,
  deletePost,
  searchAllPublicPost,
  searchTop10Post,
  likePost,
  searchLikePost,
  searchPrivatePost,
  searchPrivatePostDetail,
  uploadPrivatePost,
  searchPublicPost,
  searchPublicPostDetail,
  pullDownPublicPost
}