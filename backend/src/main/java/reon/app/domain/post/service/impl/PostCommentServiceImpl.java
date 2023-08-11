package reon.app.domain.post.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reon.app.domain.member.entity.Member;
import reon.app.domain.post.entity.Post;
import reon.app.domain.post.entity.PostComment;
import reon.app.domain.post.repository.PostCommentRepository;
import reon.app.domain.post.service.PostCommentService;
import reon.app.domain.post.service.dto.PostCommentDeleteDto;
import reon.app.domain.post.service.dto.PostCommentSaveDto;
import reon.app.domain.post.service.dto.PostCommentUpdateDto;
import reon.app.global.error.entity.CustomException;
import reon.app.global.error.entity.ErrorCode;

import javax.transaction.Transactional;
import java.util.List;


@RequiredArgsConstructor
@Service
@Transactional
public class PostCommentServiceImpl implements PostCommentService {
    private final PostCommentRepository postCommentRepository;
    @Override
    public Long delete(PostCommentDeleteDto dto) {
        PostComment findComment = postCommentRepository.findById(dto.getCommentId())
                .orElseThrow(() -> new CustomException(ErrorCode.COMMENT_NOT_FOUND));
        if(!dto.getMemberId().equals(findComment.getMember().getId())){
            throw new CustomException(ErrorCode.BAD_REQUEST);
        }
        postCommentRepository.delete(findComment);
        return findComment.getId();
    }

    @Override
    public Long save(PostCommentSaveDto dto) {
        PostComment comment = PostComment.builder()
                .post(Post.builder().id(dto.getPostId()).build())
                .member(Member.builder().id(dto.getMemberId()).build())
                .content(dto.getContent())
                .build();

        postCommentRepository.save(comment);
        return comment.getId();
    }

    @Override
    public Long update(PostCommentUpdateDto dto) {
        PostComment findComment = postCommentRepository.findById(dto.getCommentId())
                .orElseThrow(() -> new CustomException(ErrorCode.COMMENT_NOT_FOUND));
        if(!dto.getMemberId().equals(findComment.getMember().getId())){
            throw new CustomException(ErrorCode.BAD_REQUEST);
        }
        findComment.update(dto.getContent());
        return findComment.getId();
    }
}
