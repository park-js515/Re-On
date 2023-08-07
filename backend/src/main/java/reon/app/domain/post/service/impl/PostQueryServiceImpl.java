package reon.app.domain.post.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.post.dto.res.PrivateDetailPostResponse;
import reon.app.domain.post.dto.res.PublicDetailPostResponse;
import reon.app.domain.post.entity.Post;
import reon.app.domain.post.entity.Scope;
import reon.app.domain.post.repository.PostQueryRepository;
import reon.app.domain.post.service.PostQueryService;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PostQueryServiceImpl implements PostQueryService {
    private final PostQueryRepository postQueryRepository;
    @Override
    public Scope searchScopeById(Long postId) {
        return postQueryRepository.searchScopeById(postId);
    }

    @Override
    public PrivateDetailPostResponse searchPrivateById(Long postId) {
        Post post = postQueryRepository.searchPrivateById(postId);
        return PrivateDetailPostResponse.builder()
                .id(post.getId())
                .memberId(post.getMember().getId())
                .title(post.getVideo().getTitle())
                .actionPath(post.getActionPath())
                .createdDate(post.getCreateDate())
                .build();
    }

    @Override
    public PublicDetailPostResponse searchPublicById(Long postId) {
        return null;
    }
}
