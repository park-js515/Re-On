package reon.app.domain.post.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.member.entity.Member;
import reon.app.domain.member.repository.MemberRepository;
import reon.app.domain.member.service.MemberService;
import reon.app.domain.post.dto.res.*;
import reon.app.domain.post.entity.Post;
import reon.app.domain.post.entity.Scope;
import reon.app.domain.post.repository.PostCommentQueryRepository;
import reon.app.domain.post.repository.PostLikeQueryRepository;
import reon.app.domain.post.repository.PostQueryRepository;
import reon.app.domain.post.repository.PostRepository;
import reon.app.domain.post.service.PostQueryService;
import reon.app.global.error.entity.CustomException;
import reon.app.global.error.entity.ErrorCode;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class PostQueryServiceImpl implements PostQueryService {
    private final PostQueryRepository postQueryRepository;
    private final PostLikeQueryRepository postLikeQueryRepository;
    private final PostCommentQueryRepository postCommentQueryRepository;
    private final MemberRepository memberRepository;
    @Override
    public Scope searchScopeById(Long postId) {
        return postQueryRepository.searchScopeById(postId);
    }

    @Override
    public PrivateDetailPostResponse searchPrivateById(Long postId, Long loginId) {
        Post post = postQueryRepository.searchById(postId);
        if(post == null){
            throw new CustomException(ErrorCode.POSTS_NOT_FOUND);
        }
        if(post.getMember().getId() != loginId){
            throw new CustomException(ErrorCode.USER_FORBIDDEN_ERROR);
        }
        return PrivateDetailPostResponse.builder()
                .id(post.getId())
                .email(post.getMember().getEmail())
                .title(post.getVideo().getTitle())
                .actionPath(post.getActionPath())
                .createdDate(post.getCreateDate())
                .build();
    }

    @Override // 타 유저의 접근 허용
    public PublicDetailPostResponse searchPublicById(Long postId, Long loginId) {
        Post post = postQueryRepository.searchById(postId);
        if(post == null){
            throw new CustomException(ErrorCode.POSTS_NOT_FOUND);
        }
        Member loginMember = memberRepository.findById(loginId).orElseThrow(()
                 -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        String loginEmail = loginMember.getEmail();

        Boolean isLike = postLikeQueryRepository.isLike(postId, loginId);
        Boolean isMyPost = post.getMember().getId().equals(loginId);
        List<PostCommentResponse> commentResponses = postCommentQueryRepository.searchPostCommentResponse(1L, postId);
        commentResponses.forEach(res -> {
            if(res.getEmail().equals(loginEmail)){
                res.setIsMyComment(true);
            }else{
                res.setIsMyComment(false);
            }
        });
        return PublicDetailPostResponse.builder()
                .id(post.getId())
                .email(post.getMember().getEmail())
                .nickName(post.getMember().getMemberInfo().getNickName())
                .profileImg(post.getMember().getMemberInfo().getProfileImg())
                .actionPath(post.getActionPath())
                .title(post.getTitle())
                .content(post.getContent())
                .likeCnt(post.getPostLikes().size())
                .isLike(isLike)
                .isMyPost(isMyPost)
                .postCommentResponses(commentResponses)
                .createDate(post.getCreateDate())
                .build();
    }

    @Override
    public List<PrivatePostsResponse> searchPrivatePosts(Long offset, Long loginId) {
        List<PrivatePostsResponse> responses = postQueryRepository.searchPrivatePosts(offset, loginId);
        return responses;
    }

    @Override // 다른 유저의 접근 허용
    public List<PublicPostsResponse> searchPublicPosts(Long offset, Long memberId, Long loginId) {
        List<PublicPostsResponse> responses = postQueryRepository.searchPublicPosts(offset, memberId);
        responses.stream().forEach(res -> res.setIsLike(postLikeQueryRepository.isLike(res.getId(), loginId)));
        return responses;
    }

    @Override
    public List<PostsResponse> searchLikedPosts(Long offset, Long loginId) {
        List<Long> ids = postLikeQueryRepository.searchLikedPostByMemberId(loginId);
        List<PostsResponse> responses = postQueryRepository.searchLikedPosts(ids, offset, loginId);
        responses.stream().forEach(res -> res.setIsLike(true));
        return responses;
    }

    @Override
    public List<PostsResponse> searchFeedPosts(Long offset, Long loginId) {
        List<PostsResponse> responses = postQueryRepository.searchFeedPosts(offset);
        responses.stream().forEach(res -> res.setIsLike(postLikeQueryRepository.isLike(res.getId(), loginId)));
        return responses;
    }

    @Override
    public List<PostsResponse> searchFeedRankPosts(Long loginId) {
        List<PostsResponse> responses = postQueryRepository.searchFeedRankPosts();
        responses.stream().forEach(res -> res.setIsLike(postLikeQueryRepository.isLike(res.getId(), loginId)));
        return responses;
    }
}
