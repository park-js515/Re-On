package reon.app.domain.post.repository;

import reon.app.domain.post.dto.res.PostCommentResponse;

import java.util.List;


public interface PostCommentQueryRepository {

    List<PostCommentResponse> searchPostCommentResponse(Long offset, Long postId);
}
