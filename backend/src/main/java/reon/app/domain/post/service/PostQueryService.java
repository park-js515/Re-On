package reon.app.domain.post.service;

import reon.app.domain.post.dto.res.PrivateDetailPostResponse;
import reon.app.domain.post.dto.res.PublicDetailPostResponse;
import reon.app.domain.post.entity.Scope;

public interface PostQueryService {
    Scope searchScopeById(Long postId);

    PrivateDetailPostResponse searchPrivateById(Long postId);

    PublicDetailPostResponse searchPublicById(Long postId);
}
