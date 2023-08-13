package reon.app.domain.post.service;

import reon.app.domain.post.dto.res.PostCommentResponse;

import java.util.List;

public interface PostCommentQueryService {
    List<PostCommentResponse> searchPostComment(Long offset, Long postId, Long loginId);
}
