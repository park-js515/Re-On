package reon.app.domain.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reon.app.domain.post.entity.Post;
import reon.app.domain.post.entity.PostLike;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
//    PostLike findPostLikeByIdAndMemberId(Long id, Long memberId);
    PostLike findByPost_IdAndMember_Id(Long id, Long memberId);
    void deleteAllByMemberId(Long memberId);
}

