package reon.app.domain.post.service;

import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.post.service.dto.PostSaveDto;

@Transactional
public interface PostService {
    Long save(PostSaveDto postSaveDto);
}
