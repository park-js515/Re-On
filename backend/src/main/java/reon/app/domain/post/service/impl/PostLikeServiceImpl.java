package reon.app.domain.post.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.post.repository.PostLikeRepository;
import reon.app.domain.post.service.PostLikeService;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PostLikeServiceImpl implements PostLikeService {
    private final PostLikeRepository postLikeRepository;


    @Override
    public Boolean changeLike(Long memberId, Long postId) {
        if()



        return false;
    }
}
