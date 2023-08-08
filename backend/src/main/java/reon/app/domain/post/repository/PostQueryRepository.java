package reon.app.domain.post.repository;

import reon.app.domain.post.dto.res.PrivatePostsResponse;
import reon.app.domain.post.dto.res.PublicDetailPostResponse;
import reon.app.domain.post.entity.Post;
import reon.app.domain.post.entity.Scope;

import java.util.List;

public interface PostQueryRepository {
    Scope searchScopeById(Long postId);

    Post searchById(Long postId);

    List<PrivatePostsResponse> searchPrivatePosts(Long offset, Long memberId);
}
