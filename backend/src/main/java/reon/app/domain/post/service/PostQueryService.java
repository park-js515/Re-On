package reon.app.domain.post.service;

import reon.app.domain.post.dto.res.*;
import reon.app.domain.post.entity.Scope;

import java.util.List;

public interface PostQueryService {
    Scope searchScopeById(Long postId);

    PrivateDetailPostResponse searchPrivateById(Long postId, Long loginId);

    PublicDetailPostResponse searchPublicById(Long postId, Long loginId);

    List<PrivatePostsResponse> searchPrivatePosts(Long offset, Long loginId);

    List<PublicPostsResponse> searchPublicPosts(Long offset, Long memberId, Long loginId);

    List<PostsResponse> searchLikedPosts(Long offset, Long loginId);

    List<PostsResponse> searchFeedPosts(Long offset, Long loginId);

    List<PostsResponse> searchFeedRankPosts(Long loginId);
}
