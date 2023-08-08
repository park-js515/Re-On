package reon.app.domain.post.service;

public interface PostLikeService {
    Boolean changeLike(Long memberId, Long postId);
}
