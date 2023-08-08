package reon.app.domain.post.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.post.dto.res.PrivateDetailPostResponse;
import reon.app.domain.post.dto.res.PrivatePostsResponse;
import reon.app.domain.post.dto.res.PublicDetailPostResponse;
import reon.app.domain.post.entity.Post;
import reon.app.domain.post.entity.Scope;
import reon.app.domain.post.repository.PostQueryRepository;
import reon.app.domain.post.repository.PostRepository;
import reon.app.domain.post.service.PostQueryService;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class PostQueryServiceImpl implements PostQueryService {
    private final PostQueryRepository postQueryRepository;
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
        return PublicDetailPostResponse.builder()
                .id(post.getId())
                .memberId(post.getMember().getId())
                .nickName(post.getMember().getMemberInfo().getNickName())
                .profileImg(post.getMember().getMemberInfo().getProfileImg())
                .actionPath(post.getActionPath())
                .title(post.getTitle())
                .content(post.getContent())
                .likeCnt(post.getPostLikes().size())
                .createDate(post.getCreateDate())
                .build();
    }

    @Override
    public List<PrivatePostsResponse> searchPrivatePosts(Long offset, Long memberId) {
        List<PrivatePostsResponse> responses = postQueryRepository.searchPrivatePosts(offset, memberId);
        return responses;
    }
}
