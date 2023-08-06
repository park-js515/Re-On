package reon.app.domain.post.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.member.entity.Member;
import reon.app.domain.post.dto.req.PostSaveRequest;
import reon.app.domain.post.entity.Action;
import reon.app.domain.post.entity.Post;
import reon.app.domain.post.entity.Scope;
import reon.app.domain.post.repository.PostRepository;
import reon.app.domain.post.service.PostService;
import reon.app.domain.post.service.dto.PostSaveDto;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    @Override
    public Long save(PostSaveDto postSaveDto) {
        // TODO: 2023-08-07 action 도 추가해야함
        // TODO: 2023-08-07 파일업로드 클래스화

        Post post = Post.builder()
                .scope(Scope.PUBLIC)
                .vote(0)
                .member(Member.builder().id(postSaveDto.getMemberId()).build())
                .action(Action.builder().id(postSaveDto.getActionId()).build())
//              비디오도 추가해야함
                .build();


        return 1L;
    }
}
