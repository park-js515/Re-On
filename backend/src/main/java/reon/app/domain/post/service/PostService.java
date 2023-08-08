package reon.app.domain.post.service;

import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.post.entity.Post;
import reon.app.domain.post.service.dto.PostSaveDto;
import reon.app.domain.post.service.dto.PrivatePostUpdateDto;

@Transactional
public interface PostService {
    Long save(PostSaveDto postSaveDto);
    Post updatePrivateToPublic(PrivatePostUpdateDto privatePostUpdateDto);
}
