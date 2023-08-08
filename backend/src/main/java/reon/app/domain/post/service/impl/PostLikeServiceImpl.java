package reon.app.domain.post.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reon.app.domain.member.entity.Member;
import reon.app.domain.post.entity.Post;
import reon.app.domain.post.entity.PostLike;
import reon.app.domain.post.repository.PostLikeRepository;
import reon.app.domain.post.service.PostLikeService;
import reon.app.global.error.entity.CustomException;
import reon.app.global.error.entity.ErrorCode;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class PostLikeServiceImpl implements PostLikeService {
    private final PostLikeRepository postLikeRepository;


    @Override
    public Boolean changeLike(Long postId, Long memberId) {
        PostLike findPostLike = postLikeRepository.findByPost_IdAndMember_Id(postId, memberId);
        if(findPostLike == null){
            PostLike postLike = PostLike.builder()
                    .member(Member.builder().id(memberId).build())
                    .post(Post.builder().id(postId).build())
                    .build();
            postLikeRepository.save(postLike);
            return Boolean.TRUE;
        }
        postLikeRepository.delete(findPostLike);
        return Boolean.FALSE;
    }
}
