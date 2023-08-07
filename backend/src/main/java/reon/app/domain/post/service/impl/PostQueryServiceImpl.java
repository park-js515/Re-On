package reon.app.domain.post.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.post.service.PostQueryService;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PostQueryServiceImpl implements PostQueryService {
}
