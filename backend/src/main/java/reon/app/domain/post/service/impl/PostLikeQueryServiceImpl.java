package reon.app.domain.post.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.post.repository.PostQueryRepository;
import reon.app.domain.post.service.PostLikeQueryService;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class PostLikeQueryServiceImpl implements PostLikeQueryService {
    private final PostQueryRepository postQueryRepository;

}
