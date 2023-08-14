package reon.app.domain.post.service.impl;

import com.google.cloud.storage.Storage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.member.entity.Member;
import reon.app.domain.post.entity.Post;
import reon.app.domain.post.entity.Scope;
import reon.app.domain.post.repository.PostCommentRepository;
import reon.app.domain.post.repository.PostLikeRepository;
import reon.app.domain.post.repository.PostRepository;
import reon.app.domain.post.service.PostService;
import reon.app.domain.post.service.dto.PostSaveDto;
import reon.app.domain.post.service.dto.PostUpdateDto;
import reon.app.domain.post.service.dto.PrivatePostUpdateDto;
import reon.app.domain.video.entity.Video;
import reon.app.global.error.entity.CustomException;
import reon.app.global.error.entity.ErrorCode;
import reon.app.global.util.FileManger;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final PostCommentRepository postCommentRepository;
    private final PostLikeRepository postLikeRepository;
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
        return post.getId();
    }

    @Override
    public Long updatePrivateToPublic(PrivatePostUpdateDto privatePostUpdateDto) {
        Post post = postRepository.findById(privatePostUpdateDto.getId()).orElseThrow(()
                -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        if(post.getMember().getId() != privatePostUpdateDto.getLoginId()){
            throw new CustomException(ErrorCode.USER_FORBIDDEN_ERROR);
        }
        post.updatePrivateToPublic(privatePostUpdateDto);
        return post.getId();
    }

    @Override
    public Long update(PostUpdateDto postUpdateDto) {
        Post post = postRepository.findById(postUpdateDto.getId()).orElseThrow(()
                -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        if(post.getMember().getId() != postUpdateDto.getLoginId()){
            throw new CustomException(ErrorCode.USER_FORBIDDEN_ERROR);
        }
        post.updatePost(postUpdateDto);
        return post.getId();
    }

    @Override
    public Long updatePublicToPrivate(Long postId, Long loginId) {
        Post post = postRepository.findById(postId).orElseThrow(()
                -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        if(post.getMember().getId() != loginId){
            throw new CustomException(ErrorCode.USER_FORBIDDEN_ERROR);
        }
        postCommentRepository.deleteAllByPostId(postId);
        postLikeRepository.deleteAllByPostId(postId);
        String title = post.getVideo().getTitle();
        post.updatePublicToPrivate(title);
        return post.getId();
    }

    @Override
    public Long delete(Long postId, Long loginId) {
        Post post = postRepository.findById(postId).orElseThrow(()
                -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        if(post.getMember().getId() != loginId){
            throw new CustomException(ErrorCode.USER_FORBIDDEN_ERROR);
        }
        postCommentRepository.deleteAllByPostId(postId);
        postLikeRepository.deleteAllByPostId(postId);
        post.delete();
        return post.getId();
    }

    @Override
    public void deleteByMemberId(Long loginId) {
        postRepository.deleteAllPostByLoginId(loginId);
//        List<Post> posts = postRepository.findAllByMember_Id(loginId);
//        for(Post post : posts){
//            post.delete();
//        }
    }
}
