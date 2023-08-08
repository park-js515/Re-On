package reon.app.domain.post.service;

public interface PostLikeService {
    Boolean changeLike(Long postId, Long memberId);
}
