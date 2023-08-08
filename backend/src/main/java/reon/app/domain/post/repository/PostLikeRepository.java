package reon.app.domain.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reon.app.domain.post.entity.Post;
import reon.app.domain.post.entity.PostLike;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    Boolean existsPostLikeByMember_IdAndPost_Id(Long memberId, Long postId);
}

