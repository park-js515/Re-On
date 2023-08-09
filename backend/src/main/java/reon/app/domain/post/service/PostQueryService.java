package reon.app.domain.post.service;

import reon.app.domain.post.dto.res.*;
import reon.app.domain.post.entity.Scope;

import java.util.List;

public interface PostQueryService {
    Scope searchScopeById(Long postId);

    PrivateDetailPostResponse searchPrivateById(Long postId);

    PublicDetailPostResponse searchPublicById(Long postId);

    List<PrivatePostsResponse> searchPrivatePosts(Long offset, Long memberId);

    List<PublicPostsResponse> searchPublicPosts(Long offset, Long memberId);

    List<PostsResponse> searchLikedPosts(Long offset, Long memberId);
}
