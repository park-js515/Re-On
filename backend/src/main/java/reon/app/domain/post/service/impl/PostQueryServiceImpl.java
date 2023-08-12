package reon.app.domain.post.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
    @Override
    public Scope searchScopeById(Long postId) {
        return postQueryRepository.searchScopeById(postId);
    }

    @Override
    public PrivateDetailPostResponse searchPrivateById(Long postId) {
        Post post = postQueryRepository.searchById(postId);
        if(post == null){
            throw new CustomException(ErrorCode.POSTS_NOT_FOUND);
        }
        return PrivateDetailPostResponse.builder()
                .id(post.getId())
                .memberId(post.getMember().getId())
                .title(post.getVideo().getTitle())
                .actionPath(post.getActionPath())
                .createdDate(post.getCreateDate())
                .build();
    }

    @Override
    public PublicDetailPostResponse searchPublicById(Long postId, Long memberId) {
        Post post = postQueryRepository.searchById(postId);
        if(post == null){
            throw new CustomException(ErrorCode.POSTS_NOT_FOUND);
        }
        Boolean isLike = postLikeQueryRepository.isLike(postId, memberId);
        List<PostCommentResponse> commentResponses = postCommentQueryRepository.searchPostCommentResponse(1L, postId);
        return PublicDetailPostResponse.builder()
                .id(post.getId())
                .memberId(post.getMember().getId())
                .nickName(post.getMember().getMemberInfo().getNickName())
                .profileImg(post.getMember().getMemberInfo().getProfileImg())
                .actionPath(post.getActionPath())
                .title(post.getTitle())
                .content(post.getContent())
                .likeCnt(post.getPostLikes().size())
                .isLike(isLike)
                .postCommentResponses(commentResponses)
                .createDate(post.getCreateDate())
                .build();
    }

    @Override
    public List<PrivatePostsResponse> searchPrivatePosts(Long offset, Long memberId) {
        List<PrivatePostsResponse> responses = postQueryRepository.searchPrivatePosts(offset, memberId);
        return responses;
    }

    @Override
    public List<PublicPostsResponse> searchPublicPosts(Long offset, Long memberId, Long loginId) {
        List<PublicPostsResponse> responses = postQueryRepository.searchPublicPosts(offset, memberId);
        responses.stream().forEach(res -> res.setIsLike(postLikeQueryRepository.isLike(res.getId(), loginId)));
        return responses;
    }

    @Override
    public List<PostsResponse> searchLikedPosts(Long offset, Long memberId) {
        List<Long> ids = postLikeQueryRepository.searchLikedPostByMemberId(memberId);
        List<PostsResponse> responses = postQueryRepository.searchLikedPosts(ids ,offset,memberId);
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

    private List<PostCommentResponse> getCommentResponse(Post post){
        return post.getPostComments().stream().map(postComment -> PostCommentResponse.builder()
                .id(postComment.getId())
                .memberId(post.getMember().getId())
                .postId(post.getId())
                .nickName(post.getMember().getMemberInfo().getNickName())
                .profileImg(post.getMember().getMemberInfo().getProfileImg())
                .content(postComment.getContent())
                .createdDate(postComment.getCreateDate())
                .build()).collect(Collectors.toList());
    }
}
