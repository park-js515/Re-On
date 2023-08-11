package reon.app.domain.post.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.post.dto.res.PostCommentResponse;
import reon.app.domain.post.repository.PostCommentQueryRepository;
import reon.app.domain.post.service.PostCommentQueryService;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class PostCommentQueryServiceImpl implements PostCommentQueryService {
    private final PostCommentQueryRepository postCommentQueryRepository;

    @Override
    public List<PostCommentResponse> searchPostComment(Long offset, Long postId) {
        return postCommentQueryRepository.searchPostCommentResponse(offset, postId);
    }
}
