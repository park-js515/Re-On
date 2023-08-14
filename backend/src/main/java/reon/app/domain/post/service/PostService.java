package reon.app.domain.post.service;

import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.post.entity.Post;
import reon.app.domain.post.service.dto.PostSaveDto;
import reon.app.domain.post.service.dto.PostUpdateDto;
import reon.app.domain.post.service.dto.PrivatePostUpdateDto;

@Transactional
public interface PostService {
    Long save(PostSaveDto postSaveDto);
    Long updatePrivateToPublic(PrivatePostUpdateDto privatePostUpdateDto);

    Long update(PostUpdateDto postUpdateDto);

    Long updatePublicToPrivate(Long postId, Long loginId);

    Long delete(Long postId, Long loginId);

    void deleteByMemberId(Long loginId);
}
