package reon.app.domain.post.service;

import reon.app.domain.post.entity.PostComment;
import reon.app.domain.post.service.dto.PostCommentSaveDto;

public interface PostLikeService {
    Boolean changeLike(Long postId, Long memberId);
}
