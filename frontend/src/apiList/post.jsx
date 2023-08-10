import { postInstance } from './lib/index';

// 1. post 저장
function savePost(success, fail) {
  const api = postInstance();

  api.post('').then(success).catch(fail);
}

// 2. post 상세 조회
function searchPostInfo(postId, success, fail) {
  const api = postInstance();

  api.get(`/${postId}`).then(success).catch(fail);
}

// 3. post 댓글 작성
function createPostComment(postId, content, success, fail) {
  const api = postInstance();

  api.post(`/${postId}/comment`, JSON.stringify(content)).then(success).catch(fail);
} //?

// 4. post 댓글 업데이트
function updatePostComment(commentId, content, success, fail) {
  const api = postInstance();

  api
    .put(`/comment/${commentId}`, JSON.stringify(content))
    .then(success)
    .catch(fail);
}

// 5. post 댓글 삭제
function deletePostComment(commentId, success, fail) {
  const api = postInstance();

  api.delete(`/comment/${commentId}`).then(success).catch(fail);
}

// 6. 투표해줘 public post 목록 전체 조회
function searchAllPublicPost(offset, success, fail) {
  const api = postInstance();

  api.get(`/feed?offset=${offset}`).then(success).catch(fail);
}

// 7. 투표해줘 페이지 TOP10 post 조회
function searchTop10Post(success, fail) {
  const api = postInstance();

  api.get('/feed/rank').then(success).catch(fail);
}

// 8. post 좋아요
function likePost(postId, success, fail) {
  const api = postInstance();

  api.post(`/like/${postId}`).then(success).catch(fail);
}

// 9. mypage 내가 좋아요 누른 post 목록 조회
function searchLikePost(offset, success, fail) {
  const api = postInstance();

  api.get(`/liked?offset=${offset}`).then(success).catch(fail);
}

// 10. mypage private post 목록 조회
function searchPrivatePost(offset, success, fail) {
  const api = postInstance();

  api.get(`/private?offset=${offset}`).then(success).catch(fail);
}

// 11. private post upload
function uploadPrivatePost(postId, success, fail) {
  const api = postInstance();

  api.put(`private/${postId}`).then(success).catch(fail);
}

// 12. mypage public post 목록 조회
function searchPublicPost(offset, memberId, success, fail) {
  const api = postInstance();

  api.get(`/public?offset=${offset}&memberId${memberId}`).then(success).catch(fail);
}

export {
  savePost,
  searchPostInfo,
  createPostComment,
  updatePostComment,
  deletePostComment,
  searchAllPublicPost,
  searchTop10Post,
  likePost,
  searchLikePost,
  searchPrivatePost,
  uploadPrivatePost,
  searchPublicPost,
};
