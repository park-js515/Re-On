package reon.app.domain.post.repository;

import reon.app.domain.post.dto.res.*;
import reon.app.domain.post.entity.Post;
import reon.app.domain.post.entity.Scope;

import java.util.List;

public interface PostQueryRepository {
    Scope searchScopeById(Long postId);

    Post searchById(Long postId);

    List<PrivatePostsResponse> searchPrivatePosts(Long offset, Long loginId);

    List<PublicPostsResponse> searchPublicPosts(Long offset, Long memberId);

    List<PostsResponse> searchLikedPosts(List<Long> ids, Long offset, Long loginId);

    List<PostsResponse> searchFeedPosts(Long offset);
    List<PostsResponse> searchFeedRankPosts();
}
