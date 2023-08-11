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
        return PrivateDetailPostResponse.builder()
                .id(post.getId())
                .memberId(post.getMember().getId())
                .title(post.getVideo().getTitle())
                .actionPath(post.getActionPath())
                .createdDate(post.getCreateDate())
                .build();
    }

    // TODO: 2023-08-08 좋아요, 댓글구 현 후 작성 필요
    @Override
    public PublicDetailPostResponse searchPublicById(Long postId) {
        Post post = postQueryRepository.searchById(postId);
        if(post == null){
            throw new CustomException(ErrorCode.POSTS_NOT_FOUND);
        }
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
    public List<PublicPostsResponse> searchPublicPosts(Long offset, Long memberId) {
        List<PublicPostsResponse> responses = postQueryRepository.searchPublicPosts(offset, memberId);
        return responses;
    }

    @Override
    public List<PostsResponse> searchLikedPosts(Long offset, Long memberId) {
        List<Long> ids = postLikeQueryRepository.searchLikedPostByMemberId(memberId);

        List<PostsResponse> responses = postQueryRepository.searchLikedPosts(ids ,offset,memberId);
        return responses;
    }

    @Override
    public List<PostsResponse> searchFeedPosts(Long offset) {
        List<PostsResponse> responses = postQueryRepository.searchFeedPosts(offset);
        return responses;
    }

    @Override
    public List<PostsResponse> searchFeedRankPosts() {
        List<PostsResponse> responses = postQueryRepository.searchFeedRankPosts();
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
