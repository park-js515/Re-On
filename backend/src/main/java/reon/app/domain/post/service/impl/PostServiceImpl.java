package reon.app.domain.post.service.impl;

import com.google.cloud.storage.Storage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.member.entity.Member;
import reon.app.domain.post.entity.Post;
import reon.app.domain.post.entity.Scope;
import reon.app.domain.post.repository.PostRepository;
import reon.app.domain.post.service.PostService;
import reon.app.domain.post.service.dto.PostSaveDto;
import reon.app.domain.post.service.dto.PrivatePostUpdateDto;
import reon.app.domain.video.entity.Video;
import reon.app.global.error.entity.CustomException;
import reon.app.global.error.entity.ErrorCode;
import reon.app.global.util.FileManger;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final Storage storage;
    private FileManger fileManger = new FileManger();
    @Override
    public Long save(PostSaveDto postSaveDto) {
        String actionPath = fileManger.updateImgFile(postSaveDto.getActionVideo(), storage);

        Post post = Post.builder()
                .scope(Scope.PRIVATE)
                .actionPath(actionPath)
                .deleted(0)
                .member(Member.builder().id(postSaveDto.getMemberId()).build())
                .video(Video.builder().id(postSaveDto.getVideoId()).build())
                .build();
        postRepository.save(post);
        return 1L;
    }

    @Override
    public Post updatePrivateToPublic(PrivatePostUpdateDto privatePostUpdateDto) {
        Post post = postRepository.findById(privatePostUpdateDto.getId()).orElseThrow(()
                -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        post.updatePrivateToPublic(privatePostUpdateDto);
        return post;
    }
}
