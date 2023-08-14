package reon.app.domain.post.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.member.entity.Member;
import reon.app.domain.member.repository.MemberRepository;
import reon.app.domain.post.dto.res.PostCommentResponse;
import reon.app.domain.post.repository.PostCommentQueryRepository;
import reon.app.domain.post.service.PostCommentQueryService;
import reon.app.global.error.entity.CustomException;
import reon.app.global.error.entity.ErrorCode;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class PostCommentQueryServiceImpl implements PostCommentQueryService {
    private final PostCommentQueryRepository postCommentQueryRepository;
    private final MemberRepository memberRepository;

    @Override
    public List<PostCommentResponse> searchPostComment(Long offset, Long postId, Long loginId) {
        List<PostCommentResponse> responses = postCommentQueryRepository.searchPostCommentResponse(offset, postId);
        Member loginMember = memberRepository.findById(loginId).orElseThrow(()
                -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        String loginEmail = loginMember.getEmail();
        responses.forEach(res -> {
            if(res.getEmail().equals(loginEmail)){
                res.setIsMyComment(true);
            }else{
                res.setIsMyComment(false);
            }
        });

        return responses;
    }
}
