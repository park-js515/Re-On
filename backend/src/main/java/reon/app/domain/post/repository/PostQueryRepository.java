package reon.app.domain.post.repository;

import reon.app.domain.post.entity.Post;
import reon.app.domain.post.entity.Scope;

public interface PostQueryRepository {
    Scope searchScopeById(Long postId);

    Post searchPrivateById(Long postId);
}
